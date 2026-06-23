// basic calculator functions
function add(firstNum, secondNum) {
  return firstNum + secondNum;
}

function subtract(firstNum, secondNum) {
  return firstNum - secondNum;
}

function multiply(firstNum, secondNum) {
  return firstNum * secondNum;
}

function divide(firstNum, secondNum) {
  return firstNum / secondNum;
}

let firstNum = null;
let operator = null;
let secondNum = null;

function operate(firstNum, operator, secondNum) {
  if (operator === "*") {
    return multiply(firstNum, secondNum);
  } else if (operator === "/") {
    return divide(firstNum, secondNum);
  } else if (operator === "+") {
    return add(firstNum, secondNum);
  } else if (operator === "-") {
    return subtract(firstNum, secondNum);
  }
}

console.log(add(3, 4));
console.log(subtract(3, 4));
console.log(multiply(3, 4));
console.log(divide(3, 4));
console.log(operate(10, "+", 5))
console.log(operate(10, "-", 5))
console.log(operate(10, "*", 5))
console.log(operate(10, "/", 5))
