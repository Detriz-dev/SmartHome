
import './App.css'

import{BasicComponent} from "./components/BasicComponent.tsx";
import DisplayData from './components/DisplayData.tsx';

function App() {

  return (
    <>
      <div>
        <DisplayData />

        <BasicComponent
          titleprops="Counter Title"

          />
    
      </div>
    </>
  )
}

export default App
