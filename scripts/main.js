// Error when pressing enter on an empty expression
// Allow plus and minus signs when there are no operands before

import { stack } from './stack.js'; 

const output_screen = document.querySelector("#output_screen > input");
const buttons = document.querySelectorAll("#button_wrapper button");
const input_cursor = document.querySelector('#input_cursor');

// EVENT HANDLERS

// Click handler for buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
      appendToOutput(button.value);
  });
});

// Clear button handler
clear_btn.addEventListener("click", clearOutput);

// Delete button handler
delete_btn.addEventListener("click", deleteOutput);

// Equal button handler
equal_btn.addEventListener("click", displayResult);

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
      displayResult();
      return;
  } 

  appendToOutput(value);
});

// UTILITY FUNCTIONS

// Automatically scroll the input view to the end
function scrollToEnd() {
  input_cursor.scrollLeft = input_cursor.scrollWidth;
}


function appendToOutput(value) {
  // Prevent consecutive operators
  if (
      !isOperand(output_screen.value.slice(-1)) &&
      isOperator(value)
  ) {
      return;
  }
  output_screen.value += value;
  scrollToEnd();  
}

function clearOutput() {
  output_screen.value = "";
}

function deleteOutput() {
  output_screen.value = output_screen.value.slice(0, -1);
}

function isOperator(op) {
  return ["+", "-", "*", "/"].includes(op);
}

function isOperand(oprnd) {
  const isNum = /^[0-9]$/;
  return isNum.test(oprnd);
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
      if (oprnd_1 === 0 || oprnd_2 === 0) {
        throw new Error("Division to / by zero");
      }
      return oprnd_2 / oprnd_1;
    default:
      throw new Error("Invalid operator");
  }
}

function infixToPostfix() {
  let postFix = '';
  const stk = stack();

  for (let i = 0, n = output_screen.value.length; i < n; i++) {
    // If is a number or a decimal point
    if (isOperand(output_screen.value[i]) || output_screen.value[i] === '.') {
      while (i < output_screen.value.length && (isOperand(output_screen.value[i])) 
              || output_screen.value[i] === '.') {
        postFix += output_screen.value[i];
        ++i;
      }
      postFix += ' ';
      --i;
    // If is an operator
    } else if (isOperator(output_screen.value[i])) {
      // If stack top has higher precedence
      while (!stk.isEmpty && precedence(stk.top) >= precedence(output_screen.value[i])) {
        postFix += `${stk.top} `;
        stk.pop();
      }
      stk.push(output_screen.value[i]);
    }
  }

  // Pop remaining operators from stack
  while (!stk.isEmpty) {
    postFix += `${stk.top} `;
    stk.pop();
  }

  return postFix;
}

function calculate(postFix) {
  const stk = stack();
  for (let i = 0, n = postFix.length; i < n; ++i) {
    if (postFix[i] === ' ') {
      continue;
    } else if (isOperand(postFix[i])) {
      let operand = '';
      // Append numbers and decimal point until postFix[i] is an operand
      while (i < n && ((isOperand(postFix[i]) && postFix[i] !== ' ') || postFix[i] === '.')) {
        operand += postFix[i];
        ++i;
      }
      stk.push(parseFloat(operand));
    } else if (isOperator(postFix[i])) {
      if (stk.size === 1) {
        break;
      }

      const oprnd_1 = stk.top;
      stk.pop();
      const oprnd_2 = stk.top;
      stk.pop();
      try {
        stk.push(evaluate(oprnd_1, oprnd_2, postFix[i]));
      } catch (e) {
        throw e;
      };
    }
  }

  // Return the last elem inn stack which is the 
  // result of evaluating the whole expression
  return stk.top;
}

function displayResult() {
  let postFix = infixToPostfix();
  try {
    let res = calculate(postFix);  
    output_screen.value = res.toString();
  } catch (e) {
    output_screen.value = e.message;
  }
}