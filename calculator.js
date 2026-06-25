// TODO: fix when clicking number instead of operator when the first equate is done. It does not reset the calculator nor does the firstEquation becomes the new firstNumValue

const buttonsContainer = document.querySelector("#calculator-buttons");
const calculatorDisplay = document.querySelector("#calculator-display");

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

function displayValue(value) {
  const div = document.createElement("div");
  div.classList.add("value");
  div.textContent = value;
  return div;
}

function clearDisplay() {
  const values = calculatorDisplay.querySelectorAll('.value');
  values.forEach((value) => {
    value.remove();
  });
}

function resetParameters() {
  finalResult = null;
  firstNum = null;
  operator = null;
  secondNum = null;
}

function operate(firstNumValue, operatorValue, secondNumValue) {
  firstNumValue = Number(firstNumValue)
  secondNumValue = Number(secondNumValue)
  if (operator === "*") {
    return multiply(firstNumValue, secondNumValue);
  } else if (operator === "/") {
    if (secondNumValue === 0) {
      clearDisplay();
      resetParameters();
      alert("dividing by 0 is not possible");
      return null;
    } else {
      return divide(firstNumValue, secondNumValue);
    }
  } else if (operator === "+") {
    return add(firstNumValue, secondNumValue);
  } else if (operator === "-") {
    return subtract(firstNumValue, secondNumValue);
  }
}

let firstNum = null;
let operator = null;
let secondNum = null;
let finalResult = null;

let operatorChoices = {
  addition: "+",
  subtraction: "-",
  multiplication: "*",
  division: "/"
}

let operatorChoicesArray = Object.values(operatorChoices);

buttonsContainer.addEventListener('click', (event) => {
  // ignore clicks that aren't on an actual button
  if (event.target.tagName !== "BUTTON") {
    return; 
  }

  const clickedValue = event.target.textContent.trim();
  clickButton(clickedValue);
})

function clickButton(value) {

  if (finalResult != null) {
    clearDisplay();
    resetParameters();
  }

  // if = is clicked, equate
  if (value === "=") {
    if (firstNum === null) {
      return;
    }
    finalResult = String(operate(firstNum, operator, secondNum));
    if (finalResult !== "null") {
      finalResult = String(finalResult);
      clearDisplay();
      calculatorDisplay.appendChild(displayValue(finalResult));
    }
  }
  
  else if (operatorChoicesArray.includes(value) && firstNum != null && operator === null) { // gets the operator
    calculatorDisplay.appendChild(displayValue(value));
    operator = value;
    console.log(operator);
  }

  else if (calculatorDisplay.lastElementChild && operatorChoicesArray.includes(calculatorDisplay.lastElementChild.textContent.trim()) && operatorChoicesArray.includes(value) && secondNum === null) { // checks if the value clicked is an operator when there is an existing operator
    const lastValueDiv = calculatorDisplay.lastElementChild;
    lastValueDiv.remove();
    calculatorDisplay.appendChild(displayValue(value));
    operator = value;
  }
  
  else if (value === "C" || value === "AC") {
    if (value === "AC") {
      clearDisplay();
      resetParameters();
    } else {
      const lastValueDiv = calculatorDisplay.lastElementChild;
      const lastValueContent = lastValueDiv.textContent.trim();

      if (operatorChoicesArray.includes(lastValueContent)) { // removes operator
        lastValueDiv.remove();
        operator = null;
      } 
      
      else if (operator === null) { // removes firstNum
        if (firstNum.length === 1) {
          lastValueDiv.remove();
          firstNum = null;
        } else {
          lastValueDiv.remove();
        }
      }
      
      else if (operator != null) { // removes secondNum
        if (secondNum.length === 1) {
          lastValueDiv.remove();
          secondNum = null;
        } else {
          lastValueDiv.remove();
        }
      }
    }
  } 
  
  else {
    if (operatorChoicesArray.includes(value) && firstNum === null ) {
      return; // exit clickButton entirely, do nothing
    }
    calculatorDisplay.appendChild(displayValue(value));
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
      firstNum = String(newFirstNum);
      operator = value;
      secondNum = null;

      clearDisplay();
      calculatorDisplay.appendChild(displayValue(firstNum));
      calculatorDisplay.appendChild(displayValue(operator));
      console.log(firstNum);
    }
  }

}