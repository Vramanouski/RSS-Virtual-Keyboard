// CREATE DIV ELEMENTS FOR HTML //

const container = document.createElement("div");
container.classList.add("container");

const firstRow = document.createElement("div");
firstRow.classList.add("first-row");
const secondRow = document.createElement("div");
secondRow.classList.add("second-row");
const thirdRow = document.createElement("div");
thirdRow.classList.add("third-row");
const fourRow = document.createElement("div");
fourRow.classList.add("four-row");
const fifthRow = document.createElement("div");
fifthRow.classList.add("fifth-row");

const screen = document.createElement("screen");
screen.classList.add("screen");

const message = document.createElement("div");
message.classList.add("message");
message.textContent =
  "Designed for MacOS. To change language press 'Control'+'Space'";

container.append(
  screen,
  message,
  firstRow,
  secondRow,
  thirdRow,
  fourRow,
  fifthRow
);
document.body.append(container);

// IMOPORT DATA FOR BUTTONS FROM KEYBOARD_ARRAYS //

import {
  firstRowEn,
  secondRowEn,
  thirdRowEn,
  fourRowEn,
  fifthRowEn,
} from "./keyboard_arrays.js";

// ADD BUTTONS TO THE KEYBOARD

const insertButtons = (array) => {
  for (let i = 0; i < array.length; i++) {
    const button = document.createElement("div");
    button.classList.add("button");
    array == firstRowEn ? firstRow.append(button) : (array = array);
    array == secondRowEn ? secondRow.append(button) : (array = array);
    array == thirdRowEn ? thirdRow.append(button) : (array = array);
    array == fourRowEn ? fourRow.append(button) : (array = array);
    array == fifthRowEn ? fifthRow.append(button) : (array = array);

    button.textContent = array[i];
    if (button.textContent == "CapsLock") button.classList.add("wide");
    if (button.textContent == "Tab") button.classList.add("wide");
    if (button.textContent == "Shift") button.classList.add("ultrawide");
    if (button.textContent == "Space") button.classList.add("space");
    if (button.textContent == "Delete") button.classList.add("wide");
    if (button.textContent == "Return") button.classList.add("wide");
    if (button.textContent == "Command") button.classList.add("wide");
  }
};

insertButtons(firstRowEn);
insertButtons(secondRowEn);
insertButtons(thirdRowEn);
insertButtons(fourRowEn);
insertButtons(fifthRowEn);
