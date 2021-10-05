let display = "0";
let operator;
let numberStore;
let evaluated = false;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

//this section handles all the digits and display updates
const digits = document.querySelectorAll(".digit");
const digitDisplay = document.querySelector(".display");

function updateDisplay(str) {
  if (str.length > 9) {
    str = parseFloat(str);
    console.log(str);
    str *= Math.pow(10, 8);
    str = Math.round(str);
    str /= Math.pow(10, 8);
    console.log(str);
  }
  digitDisplay.textContent = str.toString();
}

function appendDigit(digit) {
  if (display === "0") {
    display = digit;
  } else if (displayLength() < 9) {
    display += digit;
  }
  updateDisplay(display);
}

digits.forEach((digit) => {
  digit.addEventListener("click", (element) => {
    if (display === "0") {
      display = element.target.id;
    } else if (displayLength() < 9) {
      display += element.target.id;
    }
    updateDisplay(display);
  });
});

function displayLength() {
  if (display.includes(".")) {
    return display.length - 1;
  } else return display.length;
}

const zeroButton = document.querySelector(".zero");

zeroButton.addEventListener("click", () => {
  if (display !== "0" && displayLength() < 9) {
    display += "0";
    updateDisplay(display);
  }
});

const decimalButton = document.querySelector(".decimal");

decimalButton.addEventListener("click", () => {
  if (!display.includes(".")) {
    display += ".";
    updateDisplay(display);
  }
});

//sections handles the two clear buttons
const backButton = document.querySelector(".backspace");

function backspace() {
  if (display.length > 1) {
    display = display.substring(0, display.length - 1);
    updateDisplay(display);
  } else {
    display = "0";
    updateDisplay(display);
  }
}

backButton.addEventListener("click", () => backspace());

const clearButton = document.querySelector(".clear");

function clearEverything() {
  display = "0";
  updateDisplay(display);
  operator = undefined;
  numberStore = undefined;
  evaluated = false;
}

clearButton.addEventListener("click", () => clearEverything());

//this section handles the operations and actual calculating
function operate() {
  if (operator === divide && display === "0") {
    updateDisplay("nice try");
    numberStore = undefined;
  }
  if (numberStore && operator) {
    display = operator(numberStore, +display).toString();
    updateDisplay(display);
    numberStore = undefined;
    evaluated = true;
  }
}

function operatorUpdate(op) {
  operate();
  operator = op;
  numberStore = +display;
  display = "0";
  if (!evaluated) {
    updateDisplay(display);
  }
}

const equalsButton = document.querySelector(".equals");

equalsButton.addEventListener("click", () => operate());

const addButton = document.querySelector(".add");

addButton.addEventListener("click", () => operatorUpdate(add));

const subtractButton = document.querySelector(".subtract");

subtractButton.addEventListener("click", () => operatorUpdate(subtract));

const multiplyButton = document.querySelector(".multiply");

multiplyButton.addEventListener("click", () => operatorUpdate(multiply));

const divideButton = document.querySelector(".divide");

divideButton.addEventListener("click", () => operatorUpdate(divide));

document.addEventListener("keydown", (element) => {
  switch (element.key) {
    case "1":
      appendDigit("1");
      break;
    case "2":
      appendDigit("2");
      break;
    case "3":
      appendDigit("3");
      break;
    case "4":
      appendDigit("4");
      break;
    case "5":
      appendDigit("5");
      break;
    case "6":
      appendDigit("6");
      break;
    case "7":
      appendDigit("7");
      break;
    case "8":
      appendDigit("8");
      break;
    case "9":
      appendDigit("9");
      break;
    case "0":
      if (display !== "0" && displayLength() < 9) {
        display += "0";
        updateDisplay(display);
      }
      break;
    case "+":
      operatorUpdate(add);
      break;
    case "-":
      operatorUpdate(subtract);
      break;
    case "*":
      operatorUpdate(multiply);
      break;
    case "/":
      operatorUpdate(divide);
      break;
    case ".":
      if (!display.includes(".")) {
        display += ".";
        updateDisplay(display);
      }
      break;
    case "=":
      operate();
      break;
    case "Enter":
      operate();
      break;
    case "Backspace":
      backspace();
      break;
    case "Escape":
      clearEverything();
      break;
    default:
      console.log("Oops you broke it.");
  }
});
