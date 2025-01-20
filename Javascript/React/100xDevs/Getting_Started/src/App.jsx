import { useState } from 'react'
import './App.css'

function App() {
  const[todos, setTodos] = useState([{ // we specify the state first 
    title: "Go to gym", // setting an initital state
    description: "Hit the gym", 
    done: true
  }]);

  function addTodo(){
    // alert('hi')
    let newArray = []; 
    for(let i = 0; i < todos.length; i++){
      newArray.push(todos[i]);
    }
    newArray.push({
      title: "Eat Food",
      description: "eat healthy food",
      done: true,
    });
    setTodos(newArray);
  }

  return (
    <div>
      <input id="title" type = "text" plceholder = "Title"></input>
      <br />
      <input id="desc" type = "text" plceholder = "Description"></input>
      <br />
      <button onClick={addTodo}>Add a ToDO</button>
      {/* {JSON.stringify(todos)} */}
      <br />
      {todos.map((todo) => (
        <Todo 
          title= {todos[0].title} 
          description= {todos[0].description} 
          done={todos.done} 
          />
      ))}
    </div>
  )
}

function Todo(props){
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
      <h1>{props.done ? "Task is done": "task is not done"}</h1>
    </div>
  );
}

export default App
