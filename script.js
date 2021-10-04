let display = '0';

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

function operate(operator, a, b) {
  return operator(a, b);
}

//this section handles all the digits and display updates
const digits = document.querySelectorAll('.digit');
const digitDisplay = document.querySelector('.display');

digits.forEach((digit) => {
  digit.addEventListener('click', (element) => {
    if(display === '0') {
      display = element.target.id;
    } else if(displayLength() < 9) {
      display += element.target.id;
    }
    digitDisplay.textContent = display;
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
    digitDisplay.textContent = display;
  }
});

const decimalButton = document.querySelector('.decimal');

decimalButton.addEventListener('click', () => {
  if(!display.includes('.')) {
    display += '.';
    digitDisplay.textContent = display;
  }
});

//sections handles the two clear buttons
const backButton = document.querySelector('.backspace');

backButton.addEventListener('click', () => {
  if(display.length > 1) {
    display = display.substring(0, display.length - 1);
    digitDisplay.textContent = display;
  } else {
    display = '0';
    digitDisplay.textContent = display;
  }
});

const clearButton = document.querySelector('.clear');

clearButton.addEventListener('click', () => {
  display = '0';
  digitDisplay.textContent = display;
});