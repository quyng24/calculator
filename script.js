const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');

let firstOperand = null; // Số thứ nhất
let operator = null; // Phép tính
let waitingForSecondOperand = false; // Chờ để xác định đang nhập số thứ hai

keys.addEventListener('click', e => {
    if (!e.target.matches('button')) return;

    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    // Xử lý khi bấm số
    if (!action) {
        if (waitingForSecondOperand) {
            display.textContent = keyContent; // Thay thế số đầu tiên bằng số thứ hai
            waitingForSecondOperand = false;
        } else {
            display.textContent = displayedNum === '0' ? keyContent : displayedNum + keyContent;
        }
    }

    // Xử lý khi bấm phép tính (+, -, ×, ÷)
    if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
        operator = action;
        firstOperand = parseFloat(displayedNum);
        waitingForSecondOperand = true; // Chuyển sang nhập số thứ hai
    }

    // Xử lý khi bấm dấu chấm (.)
    if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.';
        }
    }

    // Xử lý khi bấm "C" (Clear)
    if (action === 'clear') {
        display.textContent = '0';
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
    }

    // Xử lý khi bấm "="
    if (action === 'calculate') {
        if (operator && firstOperand !== null) {
            const secondOperand = parseFloat(displayedNum);
            const result = calculate(firstOperand, operator, secondOperand);
            display.textContent = result; // Hiển thị kết quả
            firstOperand = result; // Lưu kết quả để tính tiếp
            operator = null;
        }
    }
});

// Hàm tính toán cơ bản
function calculate(num1, operator, num2) {
    switch (operator) {
        case 'add':
            return num1 + num2;
        case 'subtract':
            return num1 - num2;
        case 'multiply':
            return num1 * num2;
        case 'divide':
            return num2 !== 0 ? num1 / num2 : 'Error';
        default:
            return num2;
    }
}
