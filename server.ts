import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const nicks: Record<string, string> = {};

type Message = {
    sender: string;
    value: string;
}

type NickChange = {
    old: string;
    new: string;
}

io.on("connection", (socket: Socket) => {
    nicks[socket.id] = socket.id;
    socket.emit("welcome", socket.id);
    socket.on("message", (message: Message) => {
        io.emit("message", message);
    });
    socket.on("nick", (change: NickChange) => {
        nicks[socket.id] = change.new;
        io.emit("nick", change);
    });
});

console.log("ready!");
httpServer.listen(3000);