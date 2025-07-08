import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  roomId: string;
  socket: WebSocket;
}
let allSockets: User[] = [];
wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const text = message.toString();
    const parsedMsg = JSON.parse(text);

    if (parsedMsg.type === "join") {
      allSockets.push({
        socket,
        roomId: parsedMsg.payload.roomId,
      });
    }

    if (parsedMsg.type === "chat") {
      const currentUserRoom = allSockets.find(
        (x) => x.socket === socket
      )?.roomId;

      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i].roomId === currentUserRoom) {
          allSockets[i].socket.send(parsedMsg.payload.message);
        }
      }
    }
  });
});
