import { io } from "socket.io-client";

const chat = document.getElementById("chat-window") as HTMLDivElement;
const input = document.getElementById("chat-input") as HTMLInputElement;

document.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        socket.emit("message", input.value);

        input.value = "";
    }
});

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
