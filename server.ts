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

type NickChange = {
    old: string;
    new: string;
}

io.on("connection", (socket: Socket) => {
    socket.emit("welcome", socket.id);
    socket.on("message", (message: Message) => {
        io.emit("message", message);
    });
    socket.on("nick", (change: NickChange) => {
        io.emit("nick", change);
    })
});

console.log("ready!");
httpServer.listen(3000);