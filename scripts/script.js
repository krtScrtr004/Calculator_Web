const output_screen = document.querySelector("#output_screen > p");
const buttons = document.querySelectorAll(".btn_class");

// Click handler for buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    appendToOutput(button.value);
  });
});

// Clear button handler
clear_btn.addEventListener("click", () => {
  output_screen.textContent = "";
});

// Delete button handler
delete_btn.addEventListener("click", () => {
  output_screen.textContent = output_screen.textContent.slice(0, -1);
});

// Equal button handler
equal_btn.addEventListener("click", () => {
    // Calculate
});

// Keyboard handler
document.addEventListener("keydown", (event) => {
  // Map keys values to pressed keys
  const map = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    ".": ".",
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    Enter: "=",
    Backspace: "delete",
    Escape: "clear",
  };

  const key = event.key;
  const value = map[key];
  if (!value || value === "Enter") {
    return;
  }

  if (value === "Backspace") {
    output_screen.textContent = output_screen.textContent.slice(0, -1);
    return;
  }

  if (value === "clear") {
    output_screen.textContent = "";
    return;
  }

  if (value == "=") {
    // Calculate
    return;
  }

  appendToOutput(value);
});

function appendToOutput(value) {
  // Prevent consecuttive operators
  const isNum = /^[0-9]$/;
  if (
    !isNum.test(output_screen.textContent.slice(-1)) &&
    ["+", "-", "*", "/"].includes(value)
  ) {
    return;
  }
  output_screen.textContent += value;
}
