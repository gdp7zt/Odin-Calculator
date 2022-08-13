let firstNumber = '';
let secondNumber = '';
let currentOperation = null;
let resetWindow = false;
function add(num1, num2){
    return(num1 + num2);
}

function subtract(num1, num2){
    return(num1-num2);
}

function multiply(num1, num2){
    return(num1 * num2);
}

function divide(num1, num2){
    return(num1/num2);
}

function operate(operator, num1, num2){
    num1 = Number(num1);
    num2 = Number(num2);
    if (operator === '/'){
        if(num2 === 0) return null;
        else return divide(num1, num2);
    }
    else if (operator === '*') return multiply(num1,num2);
    else if (operator === '-') return subtract(num1,num2);
    else if (operator === '+') return add(num1,num2);
    else return null;
}

const displayText = document.querySelector(".displayText");
const lastDisplayText = document.querySelector(".lastDisplayText");
const operatorButtons = document.querySelectorAll('[data-operator]');
const numberButtons = document.querySelectorAll('[data-number]');
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const decimalButton = document.querySelector(".decimal");
const backspaceButton = document.querySelector(".backspace");

numberButtons.forEach(btn => {
    btn.addEventListener('click', () => addNumberDisplay(btn.textContent));
});

operatorButtons.forEach(btn => {
    btn.addEventListener('click', () => addOperatorDisplay(btn.textContent));
});

equalsButton.addEventListener('click', () => Equals());
clearButton.addEventListener('click', () => clear());
decimalButton.addEventListener('click', () => point());
backspaceButton.addEventListener('click', () => backspace());
function addOperatorDisplay(operator){
    if (currentOperation !== null) {
        keepOperating();
    }
    firstNumber = displayText.textContent;
    currentOperation = operator;
    lastDisplayText.textContent = `${firstNumber} ${currentOperation}`;
    resetWindow = true;
}

function addNumberDisplay(number){
    if(displayText.textContent === '0' || resetWindow) {
        resetScreen();
    }
    displayText.textContent += number;
}

function resetScreen(){
    displayText.textContent = '';
    resetWindow = false;
}

function Equals(){
    secondNumber = displayText.textContent;
    let result = Math.round(operate(currentOperation, firstNumber, secondNumber) * 1000)/1000;
    resetScreen();
    displayText.textContent = result;
}

function keepOperating(){

    if (currentOperation === null || resetWindow) return;
    if (currentOperation === '/' && displayText.textContent === '0'){
        alert("Error! Please don't divide by 0");
        return;
    }
    secondNumber = displayText.textContent 
    displayText.textContent = Math.round(operate(currentOperation, firstNumber, secondNumber) * 1000)/1000;
    lastDisplayText.textContent = `${firstNumber} ${currentOperation} ${secondNumber} = `;
    currentOperation = null;
}

function clear(){
    displayText.textContent = '0';
    lastDisplayText.textContent = '';
    firstNumber = '';
    secondNumber = '';
    currentOperation = null;
    resetWindow = false;
}

function point() {
    if(displayText.textContent === '') displayText.textContent = '0';
    if(displayText.textContent.includes('.')) return;
    displayText.textContent += "."
}

function backspace() {
    displayText.textContent = displayText.textContent.slice(0, -1);
}
