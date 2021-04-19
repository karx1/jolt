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