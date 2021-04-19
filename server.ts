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

type LeaveEvent = {
    nick: string;
    reason: string;
}

io.on("connection", (socket: Socket) => {
    socket.emit("welcome", socket.id);

    io.emit("join", socket.id);

    nicks[socket.id] = socket.id;

    socket.on("message", (message: Message) => {
        io.emit("message", message);
    });
    socket.on("nick", (change: NickChange) => {
        nicks[socket.id] = change.new;
        io.emit("nick", change);
    });
    socket.on("disconnect", (reason: string) => {
        const ev: LeaveEvent = {
            nick: nicks[socket.id],
            reason: reason
        };

        io.emit("leave", ev);
        
        delete nicks[socket.id];
    });
});

console.log("ready!");
httpServer.listen(3000);