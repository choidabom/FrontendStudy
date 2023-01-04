## Adapter
- Adapter는 다른 서버들 사이에 실시간 어플리케이션을 동기화하는 역할을 함.
  - 현재까지의 방식에서는 **서버의 메모리의 '어댑터'**를 사용함.
  - 따라서 서버를 내렸다가 킬 때마다 모든 방, 소켓들이 사라지고 다시 시작하게 됨. 

- 브라우저 입장에서는 서버 하나와 연결하지만, 서버 입장에서는 수많은 브라우저들과 연결하기 때문에 서버가 여러 대 필요할 수 있음.
  - 서버는 서로 다른 다수의 브라우저와 connection을 맺는다. 
- 브라우저 입장에서는 서버 하나와 연결하지만, 서버 입장에서는 수많은 브라우저들과 연결하기 때문에 서버가 여러 대 필요할 수 있음.
  - 이 때 각 브라우저들이 다른 서버에 붙을 수도 있는데 각 서버의 메모리의 어댑터를 사용하게 되면 당연히 서로 같은 방을 공유 할 수 없을 것임.
  - `mongodb`와 `mongodb-adapter` 같은 어댑터를 사용해서 서버간 통신을 할 수 있도록 해결할 수 있다.

![image](https://user-images.githubusercontent.com/48302257/210476410-667fd386-acb5-4aed-b9d2-fa3cbd565491.png)

현재 서버에서 방 입장했을 때 sockets.adapter: `console.log(wsServer.sockets.adapter)`로 확인 가능하다.
```js
  rooms: Map(2) {
    '1wNcJXHoE8YqQeAXAAAB' => Set(1) { '1wNcJXHoE8YqQeAXAAAB' },
    'QrVC69T3TLeNZae9AAAF' => Set(1) { 'QrVC69T3TLeNZae9AAAF' }
  },
  sids: Map(2) {
    '1wNcJXHoE8YqQeAXAAAB' => Set(1) { '1wNcJXHoE8YqQeAXAAAB' },
    'QrVC69T3TLeNZae9AAAF' => Set(1) { 'QrVC69T3TLeNZae9AAAF' }
  },
```
위를 보고 알 수 있는 점 세 가지가 있다. 
1. 어플리케이션에 있는 모든 rooms 확인 가능
2. socketID 확인 가능
3. **rooms와 socketID가 같다는 것을 확인 가능 !**

모든 socket에는 소켓 전용 방이 존재한다. 이 때의 이 방의 id는 해당 소켓의 소켓 id와 동일하다. (이 덕분에 socketID를 가지고 private 메세지를 보낼 수 있다 !!)

그렇기 때문에 socket의 ID를 뜻하는 sids를 가져와서 Map에 있는 모든 rooms을 확인하여 어떤 socket을 위해서 만들어진 rooms을 확인한다. Private room인지 Public room인지 !

- room ID를 socketID에서 찾을 수 있다면 Private room !
- room ID를 socketID에서 찾을 수 없다면 Public room !

- 소켓 room은 private room, 만든 room 은 public room 이라고 하자!
- rooms 를 순회했을 때의 room id가 sids 에서도 존재한다면 이는 private room 인 것
- 방에 join하고 나서 다시 console.log 한 어댑터의 모습은 이러함!
![image](https://user-images.githubusercontent.com/48302257/210479046-28a62d9b-c085-4410-b98e-48e8b5693535.png)


### Enter room을 하게 됐을 때 화면에 public room을 보여주는 기능을 만들자 ! (server.js)
- get과 key를 이용해서 key가 socketID인지 아닌지를 확인
	- 값이 있는지 찾을 때는 .get("키")와 같이 사용. 
	- → 존재하는 키라면 해당하는 값을 리턴하고, 없으면 undefined 리턴

```js
rooms.forEach((_, key) => {
	if(sids.get(key) === undefined){
		console.log(key)
}
}) // private room이 아닌 public room을 찾을 수 있다 !
```

```js
//server.js

// public room 찾는 함수
function publicRooms() {
// 아래 두 줄 대신에
//	const sids = wsServer.sockets.adapter.sids; 
//	const rooms = wsServer.sockets.adapter.rooms;
// 아래와 같이 한방에 처리 가능
	const {sockets: {
			adapter: {sids, rooms},
		},
	} = wsServer; 
  const publicRooms = [];
	rooms.forEach((_, key) => {
		if(sids.get(key) === undefined) {
			publicRooms.push(key)
		}
})
	return publicRooms;
}
```

### Enter room 하게 됐을 때 화면에 public room을 보여주는 기능을 만들자 ! (app.js)
- server.sockets.emit 기능을 쓰면 "모든" 소켓에 정보를 보낼 수 있음

```js
socket.on("enter_room", (room_name, user_name, done) => {
    socket['username'] = user_name;
    socket.join(room_name);
    done();
    socket.to(room_name).emit("welcome", socket['username']);
    wsServer.sockets.emit("room_change", publicRooms());
  });
```
