import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

type Message = {
    sender: string;
    value: string;
}

io.on("connection", (socket: Socket) => {
    socket.emit("welcome", socket.id);
    socket.on("message", (message: Message) => {
        io.emit("message", message);
    })
});

console.log("ready!");
httpServer.listen(3000);