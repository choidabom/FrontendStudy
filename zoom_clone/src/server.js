import express from "express";
const app = express();
// 우리의 express app을 만들어줌
// app은 console.log("hello");를 실행하고 포트 3000을 listen 해줄 것

/* Express로 할 일 => views를 설정해주고 render 해주는게 끝!
나머지는 websocket에서 실시간으로 일어날 것임 ! */
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

/* public 폴더를 유저에게 공개해줌. 
유저가 서버내의 모든 폴더를 들여다보면 안 되기 때문에 유저가 볼 수 있는 폴더를 따로 만들어줌. */
app.use("/public", express.static(__dirname + "/public"));

/* 홈페이지로 이동시 사용될 템플릿을 렌더해주는 코드 */
app.get("/", (req, res) => res.render("home"));

/* 유저가 어떤 url로 이동하던지 홈으로 돌려보내는 코드. 
왜냐하면 다른 url은 전혀 사용하지 않고 홈만 사용할 것이기 때문.*/
app.get("/*", (res, req) => res.render("home"));
const handleListen = () => console.log("Listening on http://localhost:3000");

app.listen(3000, handleListen);
