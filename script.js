// CREATE DIV ELEMENTS FOR HTML //

const container = document.createElement("div");
container.classList.add("container");

const keyboard = document.createElement("div");
keyboard.classList.add("keyboard");

const screen = document.createElement("screen");
screen.classList.add("screen");

const message = document.createElement("div");
message.classList.add("message");
message.textContent = "Designed for MacOS";

container.append(screen, keyboard, message);
document.body.append(container);
