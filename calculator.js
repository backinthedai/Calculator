
let output = document.getElementById("output");

let btnArr = ['btnOne', 'btnTwo', 'btnThree', 'btnFour', 'btnFive', 'btnSix', 'btnSeven', 'btnEight', 'btnNine', 'btnZero', 'btnDecimal'];

let btnOpArr = ['btnPlus', 'btnMinus', 'btnMult', 'btnDivide'];
let operators = ['+', '-', '/', '*', '='];

let btnKeyArr = ['btnDecimal', 'btnAC', 'btnPlusMinus', 'btnPower', 'btnEqual', 'btnDelete'];

let currentOp;
let isOpLast = false;
let outputValueTmp;
let isDecimalDoubling = false;
let power = false;

let btnParent = document.getElementById("btn-parent");
btnParent.addEventListener("click", currentOutput, false);

function currentOutput(e) {

    //set the power on/off
    let isPowerOn = (e) => {
        if (e.target.id === "btnPower" && power === false) {
            e.target.style.backgroundColor = "#d9534f";  //red
            output.value = "Hello";
            setTimeout(function () { output.value = ""; }, 1000);
            return power = true;
        }
        else if (e.target.id === "btnPower") {
            clearDisplay();
            e.target.style.backgroundColor = "	#5cb85c"; //green
            output.value = "Good Bye";
            setTimeout(function () { output.value = ""; }, 2000);
            return power = false;
        }
    };

    if (isPowerOn(e) || (power === true)) {

        if (btnArr.indexOf(e.target.id) !== -1) {  //check numbers
            if (currentOp === "=") {
                output.value = "";
                currentOp = undefined;
            }
            output.value += e.target.value;

            if (output.value === "00" && output.value.length === 2) {
                output.value = 0;
            }

            evaluateDecimal();
        }
        else if (btnOpArr.indexOf(e.target.id) !== -1) {  //check operators

            if (output.value.length === 0) { //check operator if it is the first value
                evalOperators(e.target.value);
            }
            else if (output.value.length > 0) {

                output.value = eval(output.value) + e.target.value;
                currentOp = e.target.value;
            }
        }
        else if (e.target.id === 'btnAC') {  //check clear button
            clearDisplay();
        }
        else if (e.target.id === 'btnEqual') { //check equal button

            if (isOpLast === false) {
                /* Make sure the last index of the string is an operator*/
                if (operators.indexOf(output.value[output.value.length - 1]) !== -1) {
                    evalLastOperator();
                    isOpLast = true;
                }
                else if (output.value === "") {
                    output.value = "";
                }
                else {
                    output.value = eval(output.value);
                }
                currentOp = e.target.value;
            }
            else if (isOpLast === true) {
                output.value = eval(outputValueTmp + output.value);
            }
        }
        else if (e.target.id === 'btnPlusMinus') {  //convert number to - or +
            if (output.value < 0) {
                output.value = Math.abs(eval(output.value));
            }
            else {
                output.value = -Math.abs(eval(output.value));
            }
        }
        else if (e.target.id === 'btnDelete') {
            output.value = output.value.slice(0, -1);
        }
    }
}

function clearDisplay() {
    output.value = "";
    currentOp = "";
    isOpLast = false;
}

function evalOperators(op) {
    output.value += op;
    for (var i = 0; i < operators.length; i++) {
        if (op === operators[i] && output.value[0] === operators[i]) {
            output.value = "";
            break;
        }
    }
}

function evaluateDecimal() {
    let decIdx = output.value.indexOf('.');
    let opIdx;

    if (decIdx !== -1) {
        for (var i = 0; i < operators.length; i++) {
            opIdx = output.value.indexOf(operators[i], decIdx);
            if (opIdx > 0) {
                break;
            }
        }
    }
    //no more then one "." before the operator 
    if (opIdx === -1 && output.value.split('.').length - 1 > 1) {
        output.value = output.value.substr(0, output.value.length - 1);
    }
    //no more then one "." after the operator 
    else if (opIdx !== -1) {
        let idx = output.value.indexOf(".", opIdx);
        if (idx !== -1) {
            let lastIdx = output.value.lastIndexOf(".", output.value.length);
            if (idx !== lastIdx) {
                output.value = output.value.substr(0, output.value.length - 1);
            }
        }
    }
}

function evalLastOperator() {
    let f = output.value.substr(0, output.value.length - 1); //get the string from 0 up to the operator;
    outputValueTmp = output.value.slice(0); //Make a copy so we can use it again
    output.value = eval(output.value.concat(f)); //append the string to the eval to complete the operation string
}
