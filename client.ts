import { io } from "socket.io-client";

const chat = document.getElementById("chat-window") as HTMLDivElement;
const input = document.getElementById("chat-input") as HTMLInputElement;

document.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        const d = document.createElement("p");
        d.innerText = input.value;
        chat.appendChild(d);

        input.value = "";
    }
});

const socket = io("ws://localhost:3000");

socket.on("connect", () => {
    console.log("Connected to server!");
    console.log(socket.id);
});

socket.on("hello", (data) => {
    console.log(data);
})
