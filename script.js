let num1 = '';
let num2 = '';
let num3 = '';
let operator = '';

const buttons = document.querySelectorAll('.btn');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        handleButtonClick(button.getAttribute('value'));
    });
});

const clear = document.getElementById('clear');

function handleButtonClick(value) {
    if(isNumeric(value) || value === '.' || value === '|') {
       handleNumericInput(value);
       updateDisplay(1);

    }else if(isOperator(value)) {
        handleOperatorInput(value);
        updateDisplay(4);

    }else if(value === '='){
        handleEqualsInput();
        updateDisplay(3);
        
    }else if(value === 'AC'){
        clearAll();
        updateDisplay(0);
    }
}

function handleNumericInput(value) {
    if (operator === '') {
        num1 = handleSignToggle(num1, value);
    } else {
        num2 = handleSignToggle(num2, value);
    }
    updateDisplay();
}

function handleSignToggle(number, value) {
    if (value === '|') {
        return toggleSign(number);
    } else {
        return number + value;
    }
}

function handleOperatorInput(value) {
    if(num1 !== '' && num2 !== '') {
        calculateAndSetResult(1);
    }
    operator = value;
}

function handleEqualsInput() {
    if (num1 !== '' && num2 !== '') {
        const previousExpression = `${fixEnding(RoundNumber(num1))} ${operator} ${fixEnding(RoundNumber(num2))}`;
        calculateAndSetResult(1);

        const result = fixEnding(RoundNumber(num3)); // Change result to num3
        const previousDisplay = document.getElementById('calculator-Previous');
        const currentDisplay = document.getElementById('calculator-Current');
        const clearButton = document.getElementById('clear');

        currentDisplay.innerText = result;
        previousDisplay.innerText = `${previousExpression} = ${result}`;
        clearButton.innerText = 'C';

        operator = '';
    }
}

function toggleSign(number) {
    return number.startsWith('-') ? number.substring(1) : `-${number}`;
};

function isOperator(value) {
    return value ==='+' || value === '-' || value === 'x' || value === '÷';
};

function calculateAndSetResult(num) {
    const resultValue = calculate(parseFloat(num1), operator, parseFloat(num2));
    if (num === 1) {
        num3 = resultValue.toString();
        num1 = resultValue.toString();
        num2 = '';
    } else if (num === 2) {
        num3 = resultValue.toString();
        num1 = resultValue.toString();
    }
}

function RoundNumber(number){
    const parsedNumber = parseFloat(number);
    if (!isNaN(parsedNumber)) {
        return Math.round(parsedNumber * 1000) / 1000;
    } else {
        return '';
    }
};

function clearAll() {
    num1 = '';
    num2 = '';
    num3 = '';
    operator = '';
    result = '';
}

function isNumeric(value) {
    return !isNaN((value)) && isFinite(value);
};

function updateDisplay(displayType, previousExpression) {
    const previousDisplay = document.getElementById('calculator-Previous');
    const currentDisplay = document.getElementById('calculator-Current');
    const clearButton = document.getElementById('clear');

    switch (displayType) {
        case 0:
            currentDisplay.innerText = '0';
            previousDisplay.innerText = '';
            clearButton.innerText = 'AC';
            console.log('0')
            break;
        case 1:
            if (num1 !== '') {
                previousDisplay.innerText = `${fixEnding(RoundNumber(num1))} ${operator} ${fixEnding(RoundNumber(num2))}`;
                currentDisplay.innerText = fixEnding(RoundNumber(num1));
                clearButton.innerText = 'C';
                console.log('1')
            }
            break;
        case 2:
            currentDisplay.innerText = fixEnding(RoundNumber(num1));
            previousDisplay.innerText = `${fixEnding(RoundNumber(num1))} ${operator} ${fixEnding(RoundNumber(num2))}`;
            clearButton.innerText = 'C';
            console.log('2')
            break;
        case 3:
            if (num1 !== '' && num2 !== '') {
                const result = fixEnding(RoundNumber(num3));
                currentDisplay.innerText = result;
                previousDisplay.innerText = `${previousExpression} = ${result}`;
                clearButton.innerText = 'C';
                console.log('3')
            }
            break;
        case 4:
            currentDisplay.innerText = fixEnding(RoundNumber(num1));
            previousDisplay.innerText = `${fixEnding(RoundNumber(num1))} ${operator} ${fixEnding(RoundNumber(num2))}`;
            clearButton.innerText = 'C';
            console.log('4')
            break;
        default:
            break;
    }
}

function calculate(num1, operator, num2) {
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === 'x') {
        return multiply(num1, num2);
    } else if (operator === '÷') {
        return divide(num1, num2);
    }
}

function fixEnding(str){
    const strValue = String(str);
    if(strValue.endsWith('|')) {
        return str.slice(0, -1);
    } else {
        return str;
    };
};

function add(a, b){
    return a + b;
};

function subtract (a, b){
    return a - b;
};

function multiply (a, b){
    return a * b;
};

function divide (a, b){
    if(a === 0 || b === 0){
        return `Cannot divide by 0`
    } else {
        return a / b;
    };
};