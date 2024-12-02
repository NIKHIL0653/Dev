
let buffer = '0';
const screen = document.querySelector('.screen'); // we make a handler screen to be used later

function buttonClick(value) { 
    if(isNaN(parseInt(value))) { // this line checks if the clicked butoon is a symbol or a number
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
}

function handleNumber(number){
    // console.log('number');
    if(buffer === "0"){
        buffer = number;
    }else {
        buffer += number;
        // we dont need to replace the number but insted we need to add it to the string
        // so if we type 8 then 9 we dont want 9 to replace 8 but we want 89
        // after this we also need to reflect the numbers changing on the calculator
        // so we write a fumction called re render
    }
    console.log(buffer);
}

function handleSymbol(symbol) {
    console.log('symbol');
}

function init(){
    console.log("hi")
    document
    .querySelector('.calc-buttons')
    .addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
    });
}

function rerender() {
    screen.innerText = buffer;
}

init();