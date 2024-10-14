  // Arrays

  const personArray = ["Nikhil", "Hari", "Kirat"]
  console.log(personArray)

  //print even numbers in an Array
  const nums =[21, 34, 22, 1 ,9 ,10]
  for(let i =0; i< nums.length; i++){
    if(nums[i] % 2 == 0) console.log(nums[i])
  } 

//Print largest number
const numbers = [1, 2, 3, 4, 5,]
for(let i = 0; i< numbers.length; i++){
    var max = 0;
    if(numbers[i] > max) max = numbers[i];
}
console.log("Maximum number in arrray is " + max);

//Objects (methos to aggregate data )
const Allusers = [{
    Firstname: "Nikhil",
    gender: "Male"
}, {
    Firstname: "Hari",
    gender: "Male"
}, {
    Firstname: "Kirat", 
    gender: "Female"
}]

// console.log(user1["Firstname"])

for(let i = 0; i < Allusers.length; i++){
    if(Allusers[i]["gender"] == "Female"){ 
        console.log(Allusers[i]["Firstname"])
    }
}// as we are calling gender inside alluser we nest it
// this is called complex objects
