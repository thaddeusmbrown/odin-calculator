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
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        console.log(typeof parseInt(button.id));
        if (typeof parseInt(button.id) == "number") {
            if (stack.length == 0) {
                stack[0] = button.id;
                display.textContent = stack[0];
            } else if (typeof parseInt(stack[0]) == "number") {
                stack[0] = [stack[0],button.id].join('');
                display.textContent = stack[0];
            } else {
                stack.shift(button.id);
                display.textContent = stack[0];
            }
        } else if {button.id == ''}
        }

    })
})