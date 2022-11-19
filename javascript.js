const buttons = document.querySelectorAll("button");
const result = document.querySelector(".result")
const preResult = document.querySelector(".pre-result");
const screen = document.querySelector(".screen");
const operators = ["+","-","*","/"]
const numbersRegex = /(\d*\.?\d+)\D(\d*\.?\d+)/;
let numberA = 0;
let numberB = 0;
let operator = "";
let answer = 0;
let equalPressed = false;
let decimal = false;
let zeroCounter = 0;


function add(a,b) {
    return a+b;
};

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(operator, a, b){
    switch(operator){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
    }
}

function allClear(){
        preResult.textContent="";
        result.textContent="";
        answer = 0;
        operator = "";
}

function getNumbers(){
    let matchedNumbers = preResult.textContent.match(numbersRegex);
    numberA = parseFloat(matchedNumbers[1]);
    numberB = parseFloat(matchedNumbers[2]);
}

buttons.forEach(button=>{
    button.addEventListener('click', ()=>{        
        if (button.className === "number") {
            if(button.value==="0")
            {
                if(zeroCounter>0 && decimal==false){
                    return;
                }
                zeroCounter++;
            }
            if (equalPressed)
            {
                preResult.textContent="";
                answer = 0;
                equalPressed=false;
                decimal = false;
            }
            equalPressed=false;
            preResult.textContent += button.value;
            resize();
        }

        if (button.className==="operator"){
            if (preResult.textContent!==""){
                let lastChar = preResult.textContent.at(-1);
                if (!operators.some(op=>preResult.textContent.includes(op)) && lastChar !=="."){
                    preResult.textContent += button.value;    
                    operator = button.value;
                    decimal=false;
                }
                else if(operators.includes(lastChar)) {
                    preResult.textContent = preResult.textContent.slice(0, -1) + button.value;
                    operator = button.value;
                    decimal=false;
                }
                else if (operators.some(op=>preResult.textContent.includes(op))){
                    equalPressed=true;
                    getNumbers();
                    answer = operate(operator,numberA,numberB).toFixed(15);
                    result.textContent = parseFloat(answer);
                    decimal = false;
                }
            }
            if (result.textContent!=="" && equalPressed){
                operator = button.value;
                preResult.textContent = result.textContent + operator;
                equalPressed=false;         
                decimal=false;
            }
            zeroCounter=0;
        }

        if (button.className === "all-clear"){
            allClear()
            decimal = false;
            zeroCounter=0;
        }

        if (button.className==="equal-sign"){
            equalPressed=true;
            getNumbers();
            answer = operate(operator,numberA,numberB).toFixed(15);
            result.textContent = parseFloat(answer);
            decimal = false;
            zeroCounter=0;
        }

        if(button.className === "decimal"){
            
            if (!decimal){
                preResult.textContent += ".";
                decimal=true;
                if(equalPressed){
                    preResult.textContent = "";
                    preResult.textContent += ".";
                    equalPressed=false;
                }
                zeroCounter=0;
            }
        }
    });

})

let size = 1.5;
function resize(){
    if (preResult.scrollWidth>screen.scrollWidth-20){
        preResult.style.fontSize = `${size}em`
        size -=0.3
    }
}
