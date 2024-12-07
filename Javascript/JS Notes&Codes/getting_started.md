
// Do check out the book by kyle simpsons up & going

# What can we expect?

### 1. Programming Primer:
-> values: 42, 3.14 (both are just numbers unlike integer and float) 
           "Hello, Friend (string)
           true, false (boolean)
           null, undefined (primitive/empty values)
           [1,2,3], {name: "Nikhil"} : non-primitive values


**-> operations:** number operations => 3+4, 43 - 1
               string concatenation => "Nikhil" + "Choudhary"
               boolean operations => true && false, true || false
               unary operator => !false
               binary operator (comparision) : 3.0 == 3/ 3.0 === 3, 3 < 4
               logical operator => true || false


**-> variables:** var name = "Nikhil Choudhary"
              var age = 23
              var friends = ["Brian", "Kyle"];
              --> some other operations with variables:
              var age = 23;
              age++;
              age += 2;
              age; // 25



**-> expressions & statements:** var age = 23; (statement)
                          age = 1 + (age * 2); (expression)


**decisions, loops, functions**

### 2. Three pillars of JS (types/coersion, scope/closures, this/prototypes)

### i) Types & Coersion:
**-> primitive types:** number, string, boolean, null, undefined
"In JS everything is an object" very wrong fact

Use new:
    1) Object()
    2) Array()
    3) Function()
    4) RegExp()
    5) Date()
    6) Error()

Don't Use new:
    1) string()
    2) number()
    3) boolean()

**-> Type Coersion:**
    The way to convert from one type to another

*CODE:* 

    var msg1 = "There are ";
    var numStudents = 16;
    var msg2 = " students."
    
    console.log(msg1 + numsStudents + msg2);
    
    // Another way of writing this is
    
    var numStudents = 16;
    
    console.log(`There are ${numStudents + ""} students.`); 
    // watch how we converted number to string by adding "" after the variable

**-> EQUALITY:** 
== checks values => double equals allows coersion 
=== checks values and types => triple equals does not allow coersion (can be used only when types are the same)

NOTE* : Now it doesn't mean == means it has a lot of problem and corner cases, 
        the main takeaway is that we should always know our types instead of coersing it since 
        it is a good practice making == completely ok to use.

**-> SCOPE:** 

    var teacher = "Kyle"
    
    function OtherClass() {
    	teacher = "Suzy";
    	topic = "React";
    	console.log("Welcome!");
    }
    
    otherClass();
    
    teacher;
    topic;

since we are creating another teacher in otherClass(), it goes outside the scope and assigns the value to the variable in 
the global scope, moreover since there is no topic creation in the global scope it creates one in the global scope even
though it is declared inside the class (only in this case because it is coded in non-strict mode can differ in other scenarios).