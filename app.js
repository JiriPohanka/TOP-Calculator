const operationField = document.querySelector(".operation-field");
const resultField = document.querySelector(".result-field");
const buttons = document.querySelectorAll(".btn");

let a = 0;
let numberAString = "";
let b = 0;
let numberBString = "";
let result;
let operationFieldString = "";

function addEventListeners() {
    for (let button of buttons) {
        button.addEventListener('click', (e) => {
            const targetButton = e.target.id;
            const selectedFunction = buttonFunctions[targetButton]();
        });
    }
}

addEventListeners();

function addNumberA(number) {
    numberAString += number;
    a = parseInt(numberAString);
    operationFieldString += number;
    updateOperationField(operationFieldString);
}

function addNumberB(number) {
    numberBString += number;
    b = parseInt(numberBString);
    operationFieldString += number;
    updateOperationField(operationFieldString);
}

function decideNumber(number) {
    if (operationFieldString.match(/\+|\^|√|\*|-|\/|g/) === null) {
        addNumberA(number);
    } else if (operationFieldString.match(/\+|\^|√|\*|-|\/|g/).length === 1) {
        addNumberB(number);
    } else if (operationFieldString.match(/\+|\^|√|\*|-|\/|g/).length > 1) {
        addNumberB(number);
    } else {
        console.log("wtf, this isn`t supposed to be an option");
    }
}

function addOperationSymbol(operationSymbol) {
    if (operationFieldString.slice(-1).match(/\+|\^|√|\*|-|\/|g/)) {
        return;
    } else {
        operationFieldString += operationSymbol;
        updateOperationField(operationFieldString);
    }
}


const buttonFunctions = {
    n0: () => decideNumber(0),
    n1: () => decideNumber(1),
    n2: () => decideNumber(2),
    n3: () => decideNumber(3),
    n4: () => decideNumber(4),
    n5: () => decideNumber(5),
    n6: () => decideNumber(6),
    n7: () => decideNumber(7),
    n8: () => decideNumber(8),
    n9: () => decideNumber(9),
    plus: () => {
        runOperation(determineOperation());
        addOperationSymbol('+');
    },
    minus: () => {
        runOperation(determineOperation());
        addOperationSymbol('-');
    },
    dividedBy: () => {
        runOperation(determineOperation());
        addOperationSymbol('/');
    },
    times: () => {
        runOperation(determineOperation());
        addOperationSymbol('*');
    },
    squareRootOf: () => {
        runOperation(determineOperation());
        addOperationSymbol('√');
    },
    factorial: () => console.log('factorial'),
    toPowerOf: () => {
        runOperation(determineOperation());
        addOperationSymbol('^');
    },
    equals: () => runOperation(determineOperation()),
    C: () => eraseLast(),
    CE: () => eraseAll(),
}

const OPERATORS = ['/', '+', '*', '-', '^', '√']

const isOperator = (string) => OPERATORS.includes(string)

const getOperators = (string) => Array.from(string).filter(isOperator)


function determineOperation() {
    const operators = getOperators(operationFieldString)
    if (!operators.length) return

    let lastOperator = operators[operators.length - 1];

    return lastOperator;
}

function runOperation(operator) {
    switch (operator) {
        case '+':
            add();
            break
        case '-':
            substract();
            break
        case '/':
            divide();
            break
        case '*':
            multiply();
            break
        case '^':
            toPowerOf();
            break;
        case '√':
            rootSquareOf();
            break;
        default:
            console.log("no operator yet");
    }
}

function updateOperationField() {
    operationField.innerHTML = `${operationFieldString}`;
}

function resetOperationField() {
    operationFieldString = "";
    updateOperationField(operationFieldString);
}

function updateResultField() {
    resultField.innerHTML = `${result}`;
}

//math-related functions

function tidyUp() {
    a = result;
    numberAString = `${result}`;
    b = 0;
    numberBString = "";
}

function add() {
    result = a + b;
    updateResultField(result);
    tidyUp();
}

function substract() {
    result = a - b;
    updateResultField(result);
    tidyUp();
}

function multiply() {
    result = a * b
    updateResultField(result);
    tidyUp();
}

function divide() {
    result = a / b;
    updateResultField(result);
    tidyUp();
}

function toPowerOf() {
    result = Math.pow(a, b);
    updateResultField(result);
    tidyUp();
}

function rootSquareOf() {
    result = Math.rootSquareOf(a);
    updateResultField(result);
    tidyUp();
}

function factorialOf(a) {
    result = a * factorialOf(a - 1);
    updateResultField(result);
    tidyUp();
}

function eraseLast() {
    operators = getOperators(operationFieldString)
    if (!operators.length) {
        numberAString = numberAString.slice(0, -1);
        operationFieldString = operationFieldString.slice(0, -1);
    } else {
        numberBString = numberBString.slice(0, -1);
        operationFieldString = operationFieldString.slice(0, -1);
    }
    updateOperationField();
}

function eraseAll() {
    a = 0;
    numberAString = "";
    b = 0;
    numberBString = "";
    result = 0;
    resetOperationField();
    updateResultField();
}