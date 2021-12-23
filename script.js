//make some math operations
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

//create a function so we can do arbitrary operations on number pairs (will call 'stack')
function operate(operator, num1, num2) {
    return operator(num1, num2);
}

//select the display and button elements and add dynamic updating of display and stack
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
//figure out if user is typing out the next number or adding an operation to the stack
let stack = []
let equalHold = 0; //this bit will flip after hitting equals, so that starting with a new number will clear the stack
let decimalHold = 0; //this bit will flip if a decimal is already in the number, to prevent adding multiple decimals
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        //number selections
        if (parseInt(button.innerText)+1) { //if (a number)
            if (stack.length == 0 || equalHold) { //if the stack is empty or an equation was just completed
                stack[0] = button.id;
                equalHold = 0;
                display.textContent = stack.join(' ').replace('add', '+').replace('subtract', '-').replace('multiply', 'x').replace('divide', '÷');
            } else if (parseInt(stack[stack.length-1])) { //if (an operator was clicked), parseInt converts operator to 'NaN' 
                stack[stack.length-1] = [stack[stack.length-1],button.id].join('');
                equalHold = 0;
                display.textContent = stack.join(' ').replace('add', '+').replace('subtract', '-').replace('multiply', 'x').replace('divide', '÷');
            } else { //continue typing in the next number
                stack.push(button.id);
                equalHold = 0;
                display.textContent = stack.join(' ').replace('add', '+').replace('subtract', '-').replace('multiply', 'x').replace('divide', '÷');
            }
        //operation selections    
        } else if (stack.length != 0 && button.id == 'add' || button.id == 'subtract' || button.id == 'multiply' || button. id == 'divide') {
            if (parseInt(stack[stack.length-1])) { //if a number is on the stack, add the chosen operation
                stack.push(button.id);
                equalHold = 0;
                decimalHold = 0;
                display.textContent = stack.join(' ').replace('add', '+').replace('subtract', '-').replace('multiply', 'x').replace('divide', '÷');
            } else { //if another operation is on top of the stack, replace it with the newly chosen operation
                stack[stack.length-1]=button.id;
                display.textContent = stack.join(' ').replace('add', '+').replace('subtract', '-').replace('multiply', 'x').replace('divide', '÷');
            }
        //clear selection    
        } else if (button.id == 'clear') { //clear the display and stack
            stack = [];
            equalHold = 0;
            decimalHold = 0;
            display.textContent = stack.join(' ').replace('add', '+').replace('subtract', '-').replace('multiply', 'x').replace('divide', '÷');
        //decimal selection
        } else if (button.id == 'dot' && parseInt(stack[stack.length-1]) && !decimalHold) { //checks if a number is on top of the stack and if the decimalHold bit to see if a decimal is already on the number in the stack
            stack[stack.length-1] = stack[stack.length-1] + '.';
            display.textContent = stack.join(' ').replace('add', '+').replace('subtract', '-').replace('multiply', 'x').replace('divide', '÷');
            decimalHold=1;
        //equation operation
        } else if (button.id == 'equals') {
            if (!parseInt(stack[stack.length-1])) {
                stack.pop();
            }
            while(stack.length>1) {
                let firstNum = Number(stack.shift());
                console.log(typeof stack[stack.length-1]);
                let operation = stack.shift();
                let secondNum = Number(stack.shift());
                if (operation == 'add') {
                    stack.unshift(operate(add, firstNum, secondNum).toString());
                } else if (operation == 'subtract') {
                    stack.unshift(operate(subtract, firstNum, secondNum).toString());
                } else if (operation == 'multiply') {
                    stack.unshift(operate(multiply, firstNum, secondNum).toString());
                }  else {
                    if (!secondNum) {
                        stack=secondNum;
                        break;
                    } else {
                        stack.unshift(operate(divide, firstNum, secondNum).toString());
                    }
                }
            }
            if(!stack) {
                display.textContent = "Watch out for zero!";
                stack = [];
            } else {
                display.textContent = Math.floor(stack[0]*1000) / 1000;
                stack[0] = Math.floor(stack[0]*1000) / 1000;
                equalHold = 1;
                decimalHold = 0;
            }
        }
    });
});