import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
      <div>
        <PostComponent />
      </div>
  )
}

const style = {width: 200, backgroundColor: "white", borderRadius: 10, borderColor: "gray", borderWidth: 1 }

function PostComponent() {
  return (
      <div style = {style}> 
        Hi there 
      </div>
  )
}

export default App
