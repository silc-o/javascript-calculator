// TODO: fix when clicking number instead of operator when the first equate is done. It does not reset the calculator nor does the firstEquation becomes the new firstNumValue

const buttonsContainer = document.querySelector("#calculator-buttons");

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

let operatorChoices = {
  addition: "+",
  subtraction: "-",
  multiplication: "*",
  division: "/"
}

let operatorChoicesArray = Object.values(operatorChoices);

function operate(firstNumValue, operatorValue, secondNumValue) {
  firstNumValue = Number(firstNumValue)
  secondNumValue = Number(secondNumValue)
  if (operator === "*") {
    return multiply(firstNumValue, secondNumValue);
  } else if (operator === "/") {
    return divide(firstNumValue, secondNumValue);
  } else if (operator === "+") {
    return add(firstNumValue, secondNumValue);
  } else if (operator === "-") {
    return subtract(firstNumValue, secondNumValue);
  }
}

buttonsContainer.addEventListener('click', (event) => {
  // ignore clicks that aren't on an actual button
  if (event.target.tagName !== "BUTTON") {
    return; 
  }

  const clickedValue = event.target.textContent.trim();
  clickButton(clickedValue);
})

function clickButton(value) {
  // if = is clicked, equate
  if (value === "=") {
    console.log(operate(firstNum, operator, secondNum))
  } else if (value === operatorChoices && firstNum === null) { // if empty, cant choose operator first
    alert("Enter a number first");
  } else if (operatorChoicesArray.includes(value) && operator === null) { // gets the operator
    operator = value;
    console.log(operatorChoices);
  } else {
    // gets the first pair of numbers
    if (firstNum === null) {
      firstNum = value;
      console.log(firstNum);
    } else if (firstNum != null && !operatorChoicesArray.includes(value) && operator === null) {
      firstNum += value;
      console.log(firstNum);
    } 

    // gets the second pair
    if (firstNum != null && operator != null && !operatorChoicesArray.includes(value) && secondNum === null) {
      secondNum = value;
      console.log(secondNum);
    } else if (secondNum != null && !operatorChoicesArray.includes(value)) {
      secondNum += value;
      console.log(secondNum);
    } 

    // if a second operator is called, calculate the first two pair of numbers first 
    if (operatorChoicesArray.includes(value) && secondNum != null) {
      let newFirstNum = operate(firstNum, operator, secondNum);
      firstNum = newFirstNum;
      operator = value;
      console.log(firstNum);
    }
  }

}