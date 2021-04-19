import { io } from "socket.io-client";

const chat = document.getElementById("chat-window") as HTMLDivElement;
const input = document.getElementById("chat-input") as HTMLInputElement;
const nickButton = document.getElementById("change-nick") as HTMLButtonElement;
const nickInput = document.getElementById("nick") as HTMLInputElement;
let nick: string = "";

document.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        const message: Message = {
            sender: nick,
            value: input.value
        }

        socket.emit("message", message);

        input.value = "";
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

const socket = io("ws://localhost:3000");

socket.on("connect", () => {
    console.log("Connected to server!");
    console.log(socket.id);
});

socket.on("welcome", (id: string) => {
    nick = id;
    const message = document.createElement("p");
    message.innerText = `Welcome to jolt. You have been assigned a nickname of ${id}.`;
    chat.appendChild(message);
});

socket.on("message", (message: Message) => {
    const display = document.createElement("p");
    display.innerHTML = `<b>${message.sender}</b>: ${message.value}`;
    chat.appendChild(display);
});

socket.on("nick", (change: NickChange) => {
    const display = document.createElement("p");
    display.innerHTML = `<b>${change.old}</b> has changed their nickname to <b>${change.new}</b>`
    chat.appendChild(display);
})


nickButton.onclick = () => {
    const change: NickChange = {
        old: nick,
        new: nickInput.value
    };

    socket.emit("nick", change);

    nick = nickInput.value;
}