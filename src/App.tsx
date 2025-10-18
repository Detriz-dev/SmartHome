import { useState } from 'react'
import './App.css'
import{BasicComponent} from "./components/BasicComponent.tsx";

function App() {

  return (
    <>
      <div>
          <BasicComponent
           titleprops = "Counter Title"

          />
      </div>
    </>
  )
}

export default App
