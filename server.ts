import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer);

io.on("connection", (socket: Socket) => {
    socket.emit("hello", "world");
});

console.log("ready!");
httpServer.listen(3000);