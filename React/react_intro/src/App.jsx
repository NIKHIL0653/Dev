import {useState} from "react";

function App(){
  const [count, setCount] = useState(0);
  
  return (
    <div> 
      //the dynamic variable must always be placed in curly braces
      <CustomButton count ={count} setCount={setCount}></CustomButton>
    </div>
  )
}

function CustomButton(props){

  function onClickHandler(){
    props.setCount(count + 1);
  }
  return <button onClick = {onClickHandler}>
    Counter {props.count}
  </button>
}

export default App