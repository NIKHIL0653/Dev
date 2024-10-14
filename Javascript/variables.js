// var a = 1; //defining variable
// a = 2; // overwritten
// console.log(a); //prints 

// const a = 1; //defining variable 
// a = 2; // will throw error cuz it cannot be overwritten
// console.log(a); //prints  

//Data types
let Firstname = "Nikhil";
let age = 21;
let isMarried = true;

console.log("this persons name is " + Firstname + "and their age is " + age)

console.log("marriage status is: " + isMarried)

// // Conditional Statements
if(isMarried == true){
    console.log(Firstname + " is married")
}
else{
    console.log(Firstname + " is not married")
}

//Loops
let answer = 0;
for (let i = 0; i <= 100; i++) {
    answer += i;
}
console.log(answer);