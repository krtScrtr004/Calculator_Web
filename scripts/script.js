// Output screen
const output_screen = document.querySelector("#output_screen > p");
// Buttons
const buttons = document.querySelectorAll(".btn_class");

// Click handler for buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Prevent consecutive operators
    const isNum = /^[0-9]$/;
    if (
      !isNum.test(output_screen.textContent.slice(-1)) &&
      ["+", "-", "*", "/"].includes(button.value)
    ) {
      return;
    }
    output_screen.textContent += button.value;
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
