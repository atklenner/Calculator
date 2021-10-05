let display = '0';
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
const digits = document.querySelectorAll('.digit');
const digitDisplay = document.querySelector('.display');

function updateDisplay(str) {
  if(str.length > 9) {
    str = parseFloat(str);
    console.log(str);
    str *= Math.pow(10, 8);
    str = Math.round(str);
    str /= Math.pow(10, 8);
    console.log(str);
  }
  digitDisplay.textContent = str.toString();
}

digits.forEach((digit) => {
  digit.addEventListener('click', (element) => {
    if(display === '0') {
      display = element.target.id;
    } else if(displayLength() < 9) {
      display += element.target.id;
    }
    updateDisplay(display);
  });
});

function displayLength() {
  if(display.includes('.')) {
    return display.length - 1;
  } else return display.length;
}

const zeroButton = document.querySelector('.zero');

zeroButton.addEventListener('click', () => {
  if(display !== '0' && displayLength() < 9) {
    display += '0';
    updateDisplay(display);
  }
});

const decimalButton = document.querySelector('.decimal');

decimalButton.addEventListener('click', () => {
  if(!display.includes('.')) {
    display += '.';
    updateDisplay(display);  
  }
});

//sections handles the two clear buttons
const backButton = document.querySelector('.backspace');

backButton.addEventListener('click', () => {
  if(display.length > 1) {
    display = display.substring(0, display.length - 1);
    updateDisplay(display);  
  } else {
    display = '0';
    updateDisplay(display);  
  }
});

const clearButton = document.querySelector('.clear');

clearButton.addEventListener('click', () => {
  display = '0';
  updateDisplay(display);
  operator = undefined;
  numberStore = undefined;
  evaluated = false;
});

//this section handles the operations and actual calculating
function operate() {
  if(numberStore && operator) {
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
  display = '0';
  if(!evaluated) {
    updateDisplay(display);
  }
}

const equalsButton = document.querySelector('.equals');

equalsButton.addEventListener('click', () => operate());

const addButton = document.querySelector('.add');

addButton.addEventListener('click', () => operatorUpdate(add));

const subtractButton = document.querySelector('.subtract');

subtractButton.addEventListener('click', () => operatorUpdate(subtract));

const multiplyButton = document.querySelector('.multiply');

multiplyButton.addEventListener('click', () => operatorUpdate(multiply));

const divideButton = document.querySelector('.divide');

divideButton.addEventListener('click', () => operatorUpdate(divide));