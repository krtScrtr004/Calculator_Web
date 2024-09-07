import { stack } from './stack.js'; 

const output_screen = document.querySelector("#output_screen > p");
const buttons = document.querySelectorAll(".btn_class");

// EVENT HANDLERS

// Click handler for buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
      appendToOutput(button.value);
  });
});

// Clear button handler
clear_btn.addEventListener("click", () => {
  clearOutput();
});

// Delete button handler
delete_btn.addEventListener("click", () => {
  deleteOutput();
});

// Equal button handler
equal_btn.addEventListener("click", () => {
    // Calculate
});

// Keyboard handler
document.addEventListener("keydown", (event) => {
  // Map keys values to pressed keys
  const map = {
      0: "0", 1: "1", 2: "2", 3: "3", 4: "4",
      5: "5", 6: "6", 7: "7", 8: "8", 9: "9",
      ".": ".", "+": "+", "-": "-", "*": "*",
      "/": "/", Enter: "=", Backspace: "delete",
      Escape: "clear",
  };

  const key = event.key;
  const value = map[key];
  if (!value) {
      return;
  } else if (value === "delete") {
      deleteOutput();
      return;
  } else if (value === "clear") {
      clearOutput();
      return;
  } else if (value === "=") {
      // Calculate
      return;
  } 

  appendToOutput(value);
});

// UTILITY FUNCTIONS

function appendToOutput(value) {
  // Prevent consecutive operators
  const isNum = /^[0-9]$/;
  if (
      !isNum.test(output_screen.textContent.slice(-1)) &&
      isOperator(value)
  ) {
      return;
  }
  output_screen.textContent += value;
}

function clearOutput() {
  output_screen.textContent = "";
}

function deleteOutput() {
  output_screen.textContent = output_screen.textContent.slice(0, -1);
}

function isOperator(op) {
  return ["+", "-", "*", "/"].includes(op);
}

function precedence(op) {
  switch (op) {
    case "*":
    case "/":
      return 2;
    case "+":
    case "-":
      return 1;
    default:
      return 0;
  }
}

// Calculate adjacent operands
function evaluate(oprnd_1, oprnd_2, op) {
  switch (op) {
    case "+":
      return oprnd_1 + oprnd_2;
    case "-":
      return oprnd_2 - oprnd_1;
    case "*":
      return oprnd_1 * oprnd_2;
    case "/":
      if (oprnd_2 === 0) {
        throw new Error("Division by zero");
      }
      return oprnd_2 / oprnd_1;
    default:
      throw new Error("Invalid operator");
  }
}