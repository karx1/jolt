import { io } from "socket.io-client";

const chat = document.getElementById("chat-window") as HTMLDivElement;
const input = document.getElementById("chat-input") as HTMLInputElement;

document.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        socket.emit("message", input.value);

        input.value = "";
    }
});

type Message = {
    sender: string;
    value: string;
}

const socket = io("ws://localhost:3000");

socket.on("connect", () => {
    console.log("Connected to server!");
    console.log(socket.id);
});

socket.on("welcome", (id: string) => {
    const message = document.createElement("p");
    message.innerText = `Welcome to jolt. Your ID is ${id}`;
    chat.appendChild(message);
})

socket.on("message", (message: Message) => {
    const display = document.createElement("p");
    display.innerHTML = `<b>${message.sender}</b>: ${message.value}`;
    chat.appendChild(display);
})
