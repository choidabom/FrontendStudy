import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));
const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  console.log(socket);
});

// const sockets = [];

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anon";
//   /* send: 서버의 메서드가 아니라 socket의 메서드 ! */
//   /* connection이 생기면 socket을 받을 수 있다는 것을 알 수 있음 */
//   console.log("Connected to Browser");
//   socket.on("close", onSocketClose);
//   /* user가 보낸 메시지를 다시 user에게 보내줄 것. */

//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickmname}: ${message.payload}`)
//         );
//         break;
//       case "nickname":
//         /* socket에 새로운 item을 추가. 왜냐면 socket은 기본적으로 객체이기 때문! */
//         socket["nickmname"] = message.payload;
//         break;
//     }
//   });
// });

httpServer.listen(3000, handleListen);
