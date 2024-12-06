
let buffer = '0';
let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector('.screen'); // we make a handler screen to be used later

function buttonClick(value) { 
    if(isNaN(parseInt(value))) { // this line checks if the clicked butoon is a symbol or a number
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender(); // we call the rerender func to update every time user clicks a button
}

function handleNumber(number){
    // console.log('number');
    if(buffer === "0"){ // handle exception : what if the user is only pressing 0
        buffer = number;
    }else {
        buffer += number;
        // we dont need to replace the number but insted we need to add it to the string
        // so if we type 8 then 9 we dont want 9 to replace 8 but we want 89
        // after this we also need to reflect the numbers changing on the calculator
        // so we write a fumction called re render
    }
}

function handleMath(value) {
    if (buffer === "0") { // say the user is just clicking on operators befor giving 1st number
      // do nothing
      return;
    }
  
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
      runningTotal = intBuffer;
    } else {
      flushOperation(intBuffer);
    }
  
    previousOperator = value; // 
    //these 2 line define the behaviour after the operator is input
    // we want to store the operator and make buffer 0 for the next num to be input
    buffer = "0";
  }


  function flushOperation(intBuffer) {
    if (previousOperator === "+") {
      runningTotal += intBuffer;
    } else if (previousOperator === "-") {
      runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
      runningTotal *= intBuffer;
    } else{
      runningTotal /= intBuffer;
    }
  }

function handleSymbol(value) {
    switch (value) {
      case "C":
        buffer = "0";
        runningTotal = 0;
        break;
      case "=":
        if (previousOperator === null) {
          // need two numbers to do math
          return;
        }
        flushOperation(parseInt(buffer));
        previousOperator = null; // we dont want ot track prev operator after pressing equals
        buffer = +runningTotal;
        runningTotal = 0;
        break;
      case "←":
        if (buffer.length === 1) { // we need this to handle edge case: what if there is only one num input just make it 0
          buffer = "0";
        } else {
          buffer = buffer.substring(0, buffer.length - 1); // else we substract the 0th element from the string
        }
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        handleMath(value);
        break;
    }
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




// let runningTotal = 0;
// let buffer = "0";
// let previousOperator;
// const screen = document.querySelector(".screen");

// function buttonClick(value) {
//   if (isNaN(parseInt(value))) {
//     handleSymbol(value);
//   } else {
//     handleNumber(value);
//   }
//   rerender();
// }

// function handleNumber(value) {
//   if (buffer === "0") {
//     buffer = value;
//   } else {
//     buffer += value;
//   }
// }

// function handleMath(value) {
//   if (buffer === "0") {
//     // do nothing
//     return;
//   }

//   const intBuffer = parseInt(buffer);
//   if (runningTotal === 0) {
//     runningTotal = intBuffer;
//   } else {
//     flushOperation(intBuffer);
//   }

//   previousOperator = value;

//   buffer = "0";
// }

// function flushOperation(intBuffer) {
//   if (previousOperator === "+") {
//     runningTotal += intBuffer;
//   } else if (previousOperator === "-") {
//     runningTotal -= intBuffer;
//   } else if (previousOperator === "×") {
//     runningTotal *= intBuffer;
//   } else {
//     runningTotal /= intBuffer;
//   }
// }

// function handleSymbol(value) {
//   switch (value) {
//     case "C":
//       buffer = "0";
//       runningTotal = 0;
//       break;
//     case "=":
//       if (previousOperator === null) {
//         // need two numbers to do math
//         return;
//       }
//       flushOperation(parseInt(buffer));
//       previousOperator = null;
//       buffer = +runningTotal;
//       runningTotal = 0;
//       break;
//     case "←":
//       if (buffer.length === 1) {
//         buffer = "0";
//       } else {
//         buffer = buffer.substring(0, buffer.length - 1);
//       }
//       break;
//     case "+":
//     case "-":
//     case "×":
//     case "÷":
//       handleMath(value);
//       break;
//   }
// }

// function rerender() {
//   screen.innerText = buffer;
// }

// function init() {
//   document
//     .querySelector(".calc-buttons")
//     .addEventListener("click", function (event) {
//       buttonClick(event.target.innerText);
//     });
// }

// init();