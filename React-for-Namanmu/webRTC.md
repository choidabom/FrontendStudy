### WebRTC란?
웹 브라우저가 서로 통신할 수 있도록 설계된 API를 말한다. WebRTC라고 하면 P2P(Peer-to-Peer) 연결이 기본이다. 

> 참고 1: WebRTC는 Web Real-Time Communication의 약자이다.

> 참고 2: MCU, SFU 등   중앙서버를 두어 트래픽을 중계하는 방식으로 구성하면 다자간 통신도 가능하다. 
---
### Why WebRTC?
이를 설명하기 위해서 HTTP vs WebSocket에 대해 말할 필요가 있다.

**HTTP**
- stateless: 서버가 클라이언트에 대한 내용을 기억하지 못한다. 단지 요청에 대한 응답만 해주고 끝!
- 클라이언트의 요청에 대한 응답만 해줄 뿐 서버 측에서 알아서 메시지를 생성해 클라이언트에 전송하지 못한다.

**WebSocket**
- 처음 Request, Accept 과정을 통해 양방향 연결을 맺는다.
- 클라이언트 뿐만 아니라 서버에서도 메시지 전송 가능하다. 

| HTTP | WebSocket |
| ------------ | ------------- |
|![image](https://user-images.githubusercontent.com/48302257/210293562-a4873dba-0876-4970-9685-c9bfe56ba722.png)|![image](https://user-images.githubusercontent.com/48302257/210293571-b52827f3-048b-4f17-ae18-ec9ec2acc4d2.png)

웹소켓(WebSocket)을 사용하면서 몇 가지 단점을 만날 수 있다..
> 1. 웹 소켓은 서버의 '메모리 파워'가 중요함. (모든 통신을 추적하기 위함.)
> 2. 서버도 빠르게 유지해야함. (메시지를 받으면 다른 사람에게 포워딩 해야하기 때문. 거의 실시간으로.)

이러한 한계를 극복하지 못한다면 사용자 경험이 좋지 못할 것이다. 따라서 브라우저를 웹소켓 서버에 연결시키는 것이 아닌 **브라우저끼리 연결시킬 방법**이 WebRTC 이다. 

---

### WebRTC에 대한 설명과 특징
|시스템 아키텍처|
|:---:|
|![image](https://user-images.githubusercontent.com/48302257/210301213-c973a90d-9066-4bed-99ec-5b30e9294369.png)|

|시그널링 과정|
|:---:|
|![image](https://user-images.githubusercontent.com/48302257/210301302-88070c42-da5d-4769-946a-14625b2ffec3.png)|

> Signaling(시그널링): 데이터를 교환하기 위한 RTCPeerConnection을 통해 메시지를 주고받기 위한 일련의 과정을 말함.
1. 서버는 단지 웹 브라우저를 특정하기 위한 시그널링(Signaling) 과정으로만 쓰임.
2. 시그널링을 마친 뒤 실제 데이터는 P2P 혹은 중개 서버를 통해 주고받는다.

---
### 그렇다면, OpenVidu는 무엇이고, 쿠렌토(Kurento)는 무엇인가?
- `OpenVidu`: Kurento 기반의 중개 서버를 애플리케이션에 쉽게 추가할 수 있도록 완전한 기술스택을 제공하는 플랫폼.
  - 웬만한 기술 스택을 제공한다. (React, React Native, Java, node, Angular, Vue, ...)

- `Kurento`: WebRTC 미디어 서버 역할을 함과 동시에 WebRTC 기술을 이용해 애플리케이션 개발을 돕는 클라이언트 API 세트.


Reference) https://github.com/Heongilee/Therapist/discussions/186
 
