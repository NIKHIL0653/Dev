// function sum (num1, num2){
//     return num1 + num2;
// }

// const num1 = 3;
// const num2 = 5;
// const ans = sum(num1, num2)
// console.log(ans)

//callback  

function add(n1, n2, fnToCall){
    let result = n1 + n2;
    fnToCall(result);
}
 
function displayResult(data){
    console.log("Result of Sum is " + data);
}

function displayResultPassive(data){
    console.log("Sum's  Result is " + data);
}

// var result = add(1,2); // here we are calling 2 functions
// displayResult(result);

//how to call and display result in one line
const ans = sum(1, 2, displayResult) 
// passing functions as arguments


// function calcArithmetic(a, b, type){
//     if (type == "sum"){
//         const value = sum(a,b);
//         return value;
//     }
//     if(type == "minus"){
//         const value = sub(a, b)
//         return value;
//     }
// }

// function sum(a, b){
//     return a+b;
// }

// function sub(a, b){
//     return a - b;
// }

function calcArithmetic(a, b, arithmeticFinal){
    const ans = arithmeticFinal(a, b);
    // called functions inside a function
    // this is called callback
    return ans;
}

function sum(a, b){
    return a+b;
}

const value = calcArithmetic(1, 2, sum);
console.log(value);

//set timeout function
// calls a function after a set period of time

function greet(){
    console.log("Hello, Alien!");
}

setTimeout(greet, 3 * 1000)
