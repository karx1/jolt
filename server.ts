import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket: Socket) => {
    socket.emit("hello", "world");
});

console.log("ready!");
httpServer.listen(3000);