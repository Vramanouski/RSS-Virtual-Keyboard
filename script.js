const arrayFixedIndexes = [
  14, 15, 29, 30, 42, 43, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64,
];
const arrayWidekeys = [14, 30, 42, 43, 55];

const arraykeysFixed = [
  "Backspace",
  "Tab",
  "Del",
  "CapsLock",
  "Enter",
  "Shift",
  "▲",
  "Shift",
  "Ctrl",
  "Win",
  "Alt",
  "&nbsp",
  "Alt",
  "◄",
  "▼",
  "►",
  "Ctrl",
];
const arraykeysEn = "`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./".split(
  ""
);
const arrWhich = [
  192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 109, 61, 81, 87, 69, 82, 84, 89,
  85, 73, 79, 80, 219, 221, 220, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222,
  90, 88, 67, 86, 66, 78, 77, 188, 190, 191,
];
const arraykeysRu = "ё1234567890-=йцукенгшщзхъ\\фывапролджэячсмитьбю.".split(
  ""
);
const arraykeysEnCaps =
  "`1234567890-=QWERTYUIOP[]\\ASDFGHJKL;'ZXCVBNM,./".split("");
const arraykeysRuCaps =
  "Ё1234567890-=ЙЦУКЕНГШЩЗХЪ\\ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ.".split("");
const arraykeysEnShift =
  '~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?</>'.split("");
const arraykeysRuShift =
  'Ё!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,'.split("");
const arraykeysShiftCapsEn =
  '~!@#$%^&*()_+qwertyuiop{}|asdfghjkl:"zxcvbnm<>?</>'.split("");
const arraykeysShiftCapsRu =
  'Ё!"№;%:?*()_+йцукенгшщзхъ/фывапролджэячсмитьбю,'.split("");
let currentLang = "en";
let arraykeysCommon;
const container = document.createElement("div");
container.classList.add("container");
const keyboard = document.createElement("div");
keyboard.classList.add("keyboard");
const screen = document.createElement("textarea");
screen.classList.add("screen");
screen.autofocus = true;
const text = document.createElement("div");
text.classList.add("text");
text.innerHTML =
  "You can switch languages by pressing <b>Ctrl</b> + <b>Shift</b>";

for (let i = 1; i <= 64; i += 1) {
  const key = document.createElement("div");
  key.classList.add("key");
  if (arrayFixedIndexes.includes(i)) {
    key.classList.add("fixed");
  } else key.classList.add("nonfixed");
  if (arrayWidekeys.includes(i)) {
    key.classList.add("wide");
  }
  if (i === 59) key.classList.add("space");
  keyboard.append(key);
  if (i === 43 || i === 55) key.classList.add("shift");
  if (i === 56 || i === 61) key.classList.add("ctrl");
  if (i === 30) key.classList.add("CapsLock");
}

const fixedArr = keyboard.querySelectorAll(".fixed");
const nonFixedArr = keyboard.querySelectorAll(".nonfixed");

fixedArr.forEach((x, i) => {
  const tmp = x;
  tmp.innerHTML = arraykeysFixed[i];
});

if (currentLang === "en") {
  nonFixedArr.forEach((x, i) => {
    const tmp = x;
    tmp.innerHTML = arraykeysEn[i];
  });
} else if (currentLang === "ru") {
  nonFixedArr.forEach((x, i) => {
    const tmp = x;
    tmp.innerHTML = arraykeysEn[i];
  });
}
if (!arraykeysCommon) {
  arraykeysCommon = Array.prototype.slice
    .call(keyboard.querySelectorAll(".key"))
    .map((x) => x.innerHTML);
}

// FUNCTIONS

const mouseDownInput = (e) => {
  e.preventDefault();
  if (
    e.target.closest(".nonfixed") ||
    (e.target.closest(".key") &&
      ["▲", "◄", "▼", "►"].includes(e.target.closest(".key").innerHTML))
  ) {
    screen.value += e.target.closest(".key").innerHTML;
  }
  if (e.target.closest(".space")) {
    screen.value += " ";
  }
  if (
    e.target.closest(".key") &&
    e.target.closest(".key").innerHTML === "Tab"
  ) {
    screen.value += "    ";
  }
  if (
    e.target.closest(".key") &&
    e.target.closest(".key").innerHTML === "Enter"
  ) {
    screen.value += "\n";
  }
  if (
    e.target.closest(".key") &&
    e.target.closest(".key").innerHTML === "Backspace"
  ) {
    const tmp = screen.selectionStart;
    screen.value = screen.value.slice(0, tmp - 1) + screen.value.slice(tmp);
    screen.selectionEnd = tmp - 1;
  }
  if (
    e.target.closest(".key") &&
    e.target.closest(".key").innerHTML === "Del"
  ) {
    const tmp = screen.selectionStart;
    screen.value = screen.value.slice(0, tmp) + screen.value.slice(tmp + 1);
    screen.selectionEnd = tmp;
  }
  if (e.target.closest(".CapsLock")) {
    if (e.target.closest(".CapsLock").classList.contains("pressed")) {
      e.target.closest(".CapsLock").classList.remove("pressed");
    } else e.target.closest(".CapsLock").classList.add("pressed");
  } else if (e.target.closest(".key")) {
    e.target.closest(".key").classList.add("pressed");
  }
};

const mouseUpInput = (e) => {
  if (e.target.closest(".shift"))
    e.target.closest(".shift").classList.remove("pressed");
  keyboard.querySelectorAll(".key").forEach((x) => {
    if (!x.classList.contains("CapsLock") && !x.classList.contains("shift"))
      x.classList.remove("pressed");
  });
};

const displayOnScreenKeyboardDown = (e) => {
  let keyDoubleCheck;
  if (e.code === "Space") keyDoubleCheck = "&nbsp;";
  if (e.key === "Delete") keyDoubleCheck = "Del";
  if (e.key === "Meta") keyDoubleCheck = "Win";
  if (e.key === "Control") keyDoubleCheck = "Ctrl";
  if (e.key === "ArrowUp") keyDoubleCheck = "▲";
  if (e.key === "ArrowDown") keyDoubleCheck = "▼";
  if (e.key === "ArrowLeft") keyDoubleCheck = "◄";
  if (e.key === "ArrowRight") keyDoubleCheck = "►";

  if (
    (!keyDoubleCheck && arraykeysCommon.indexOf(e.key) === -1) ||
    e.key === "."
  ) {
    const ind = arrWhich.indexOf(e.which);
    if (!keyboard.querySelectorAll(".nonfixed")[ind]) {
      return;
    }
    keyDoubleCheck = keyboard.querySelectorAll(".nonfixed")[ind].innerHTML;
  } else if (!keyDoubleCheck) keyDoubleCheck = e.key;

  const ind = ["ShiftRight", "ControlRight", "AltRight"].includes(e.code)
    ? arraykeysCommon.lastIndexOf(keyDoubleCheck)
    : arraykeysCommon.indexOf(keyDoubleCheck);

  if (ind !== -1) {
    if (keyDoubleCheck === "CapsLock") {
      if (keyboard.querySelector(".CapsLock").classList.contains("pressed")) {
        keyboard.querySelector(".CapsLock").classList.remove("pressed");
      } else keyboard.querySelector(".CapsLock").classList.add("pressed");
    } else {
      keyboard.querySelectorAll(".key")[ind].classList.add("pressed");

      if (!keyboard.querySelectorAll(".key")[ind].classList.contains("fixed")) {
        e.preventDefault();
        screen.value += keyDoubleCheck;
      } else if (keyDoubleCheck === "Tab") {
        e.preventDefault();
      }
    }

    if (keyDoubleCheck === "Tab") e.preventDefault();

    if (keyDoubleCheck === "Tab") {
      screen.value += "    ";
    }
  }
};

const displayOnScreenKeyboardUp = (e) => {
  let keyDoubleCheck;
  if (e.code === "Space") keyDoubleCheck = "&nbsp;";
  if (e.key === "Delete") keyDoubleCheck = "Del";
  if (e.key === "Meta") keyDoubleCheck = "Win";
  if (e.key === "Control") keyDoubleCheck = "Ctrl";
  if (e.key === "ArrowUp") keyDoubleCheck = "▲";
  if (e.key === "ArrowDown") keyDoubleCheck = "▼";
  if (e.key === "ArrowLeft") keyDoubleCheck = "◄";
  if (e.key === "ArrowRight") keyDoubleCheck = "►";

  if (
    (!keyDoubleCheck && arraykeysCommon.indexOf(e.key) === -1) ||
    e.key === "."
  ) {
    const ind = arrWhich.indexOf(e.which);
    if (!keyboard.querySelectorAll(".nonfixed")[ind]) {
      return;
    }
    keyDoubleCheck = keyboard.querySelectorAll(".nonfixed")[ind].innerHTML;
  } else if (!keyDoubleCheck) keyDoubleCheck = e.key;

  let ind;
  if (e.code !== "CapsLock") {
    ind = ["ShiftRight", "ControlRight", "AltRight"].includes(e.code)
      ? arraykeysCommon.lastIndexOf(keyDoubleCheck)
      : arraykeysCommon.indexOf(keyDoubleCheck);
    if (ind !== -1) {
      document.querySelectorAll(".key")[ind].classList.remove("pressed");
    }
  }
};

const shifts = keyboard.querySelectorAll(".shift");
const capsLock = keyboard.querySelector(".CapsLock");
const ctrls = keyboard.querySelectorAll(".ctrl");

const shiftInfluentOn = (e) => {
  if (e.target.closest(".shift") || e.key === "Shift") {
    if (currentLang === "en") {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        if (capsLock.classList.contains("pressed")) {
          tmp.innerHTML = arraykeysShiftCapsEn[i];
        } else tmp.innerHTML = arraykeysEnShift[i];
        arraykeysCommon = Array.prototype.slice
          .call(keyboard.querySelectorAll(".key"))
          .map((y) => y.innerHTML);
      });
    } else {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        if (capsLock.classList.contains("pressed")) {
          tmp.innerHTML = arraykeysShiftCapsRu[i];
        } else tmp.innerHTML = arraykeysRuShift[i];
        arraykeysCommon = Array.prototype.slice
          .call(keyboard.querySelectorAll(".key"))
          .map((y) => y.innerHTML);
      });
    }
  }
};

const shiftInfluentOff = (e) => {
  if (
    e.key === "Shift" &&
    (ctrls[0].classList.contains("pressed") ||
      ctrls[1].classList.contains("pressed"))
  )
    return;

  if (e.target.closest(".shift") || e.key === "Shift") {
    if (currentLang === "en") {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        if (capsLock.classList.contains("pressed")) {
          tmp.innerHTML = arraykeysEnCaps[i];
        } else tmp.innerHTML = arraykeysEn[i];

        arraykeysCommon = Array.prototype.slice
          .call(keyboard.querySelectorAll(".key"))
          .map((y) => y.innerHTML);
      });
    } else {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        if (capsLock.classList.contains("pressed")) {
          tmp.innerHTML = arraykeysRuCaps[i];
        }
        tmp.innerHTML = arraykeysRu[i];

        arraykeysCommon = Array.prototype.slice
          .call(keyboard.querySelectorAll(".key"))
          .map((y) => y.innerHTML);
      });
    }
  }
};

const capsLogInfluent = (e) => {
  if (e.key === "CapsLock") {
    if (!document.querySelector(".CapsLock").classList.contains("pressed")) {
      if (
        shifts[0].classList.contains("pressed") ||
        shifts[1].classList.contains("pressed")
      ) {
        if (currentLang === "en") {
          nonFixedArr.forEach((x, i) => {
            const tmp = x;
            tmp.innerHTML = arraykeysEnShift[i];
            arraykeysCommon = Array.prototype.slice
              .call(keyboard.querySelectorAll(".key"))
              .map((y) => y.innerHTML);
          });
        } else {
          nonFixedArr.forEach((x, i) => {
            const tmp = x;
            tmp.innerHTML = arraykeysRuShift[i];
            arraykeysCommon = Array.prototype.slice
              .call(keyboard.querySelectorAll(".key"))
              .map((y) => y.innerHTML);
          });
        }
      } else if (currentLang === "en") {
        nonFixedArr.forEach((x, i) => {
          const tmp = x;
          tmp.innerHTML = arraykeysEn[i];
          arraykeysCommon = Array.prototype.slice
            .call(keyboard.querySelectorAll(".key"))
            .map((y) => y.innerHTML);
        });
      } else {
        nonFixedArr.forEach((x, i) => {
          const tmp = x;
          tmp.innerHTML = arraykeysRu[i];
          arraykeysCommon = Array.prototype.slice
            .call(keyboard.querySelectorAll(".key"))
            .map((y) => y.innerHTML);
        });
      }
    } else if (
      shifts[0].classList.contains("pressed") ||
      shifts[1].classList.contains("pressed")
    ) {
      if (currentLang === "en") {
        nonFixedArr.forEach((x, i) => {
          const tmp = x;
          tmp.innerHTML = arraykeysShiftCapsEn[i];
          arraykeysCommon = Array.prototype.slice
            .call(keyboard.querySelectorAll(".key"))
            .map((y) => y.innerHTML);
        });
      } else {
        nonFixedArr.forEach((x, i) => {
          const tmp = x;
          tmp.innerHTML = arraykeysShiftCapsRu[i];
          arraykeysCommon = Array.prototype.slice
            .call(keyboard.querySelectorAll(".key"))
            .map((y) => y.innerHTML);
        });
      }
    } else if (currentLang === "en") {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        tmp.innerHTML = arraykeysEnCaps[i];
        arraykeysCommon = Array.prototype.slice
          .call(keyboard.querySelectorAll(".key"))
          .map((y) => y.innerHTML);
      });
    } else {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        tmp.innerHTML = arraykeysRuCaps[i];
        arraykeysCommon = Array.prototype.slice
          .call(keyboard.querySelectorAll(".key"))
          .map((y) => y.innerHTML);
      });
    }
  } else if (e.target.closest(".CapsLock")) {
    if (document.querySelector(".CapsLock").classList.contains("pressed")) {
      if (currentLang === "en") {
        nonFixedArr.forEach((x, i) => {
          const tmp = x;
          tmp.innerHTML = arraykeysEn[i];
          arraykeysCommon = Array.prototype.slice
            .call(keyboard.querySelectorAll(".key"))
            .map((y) => y.innerHTML);
        });
      } else {
        nonFixedArr.forEach((x, i) => {
          const tmp = x;
          tmp.innerHTML = arraykeysRu[i];
          arraykeysCommon = Array.prototype.slice
            .call(keyboard.querySelectorAll(".key"))
            .map((y) => y.innerHTML);
        });
      }
    } else if (currentLang === "en") {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        tmp.innerHTML = arraykeysEnCaps[i];
        arraykeysCommon = Array.prototype.slice
          .call(keyboard.querySelectorAll(".key"))
          .map((y) => y.innerHTML);
      });
    } else {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        tmp.innerHTML = arraykeysRuCaps[i];
        arraykeysCommon = Array.prototype.slice
          .call(keyboard.querySelectorAll(".key"))
          .map((y) => y.innerHTML);
      });
    }
  }
};

const langSwitch = (e) => {
  if (
    (e.key === "Shift" &&
      (ctrls[0].classList.contains("pressed") ||
        ctrls[1].classList.contains("pressed"))) ||
    (e.key === "Control" &&
      (shifts[0].classList.contains("pressed") ||
        shifts[1].classList.contains("pressed")))
  ) {
    if (currentLang === "en") {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        tmp.innerHTML = arraykeysRu[i];
      });
    } else {
      nonFixedArr.forEach((x, i) => {
        const tmp = x;
        tmp.innerHTML = arraykeysEn[i];
      });
    }
    if (currentLang === "en") {
      currentLang = "ru";
    } else currentLang = "en";
    arraykeysCommon = Array.prototype.slice
      .call(keyboard.querySelectorAll(".key"))
      .map((y) => y.innerHTML);
  }
};

const changeLangLocalStorage = (curLang) => {
  if (curLang === "ru") {
    nonFixedArr.forEach((x, i) => {
      const tmp = x;
      tmp.innerHTML = arraykeysRu[i];
    });
    arraykeysCommon = Array.prototype.slice
      .call(keyboard.querySelectorAll(".key"))
      .map((y) => y.innerHTML);
  } else {
    nonFixedArr.forEach((x, i) => {
      const tmp = x;
      tmp.innerHTML = arraykeysEn[i];
    });
    arraykeysCommon = Array.prototype.slice
      .call(keyboard.querySelectorAll(".key"))
      .map((y) => y.innerHTML);
  }
};

const setLocalStorage = () => {
  localStorage.setItem("currentLang", currentLang);
};

const getLocalStorage = () => {
  if (localStorage.getItem("currentLang")) {
    currentLang = localStorage.getItem("currentLang");
    changeLangLocalStorage(currentLang);
  }
};

// EVENT LISTENERS

keyboard.addEventListener("mousedown", mouseDownInput);
keyboard.addEventListener("mouseup", mouseUpInput);

document.addEventListener("keydown", displayOnScreenKeyboardDown);
document.addEventListener("keyup", displayOnScreenKeyboardUp);
shifts.forEach((x) => {
  x.addEventListener("mousedown", shiftInfluentOn);
  x.addEventListener("mouseup", shiftInfluentOff);
});
document.addEventListener("keydown", shiftInfluentOn);
document.addEventListener("keyup", shiftInfluentOff);
capsLock.addEventListener("mousedown", capsLogInfluent);
document.addEventListener("keydown", capsLogInfluent);
document.addEventListener("keydown", langSwitch);
window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

container.append(screen, keyboard, text);
document.body.append(container);
