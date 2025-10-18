import {useState} from "react";

interface TestingComponentProps {
    titleprops : string
}

export const BasicComponent: React.FC<TestingComponentProps> = ({ titleprops}) => {

    const [counterCurrentValue, setCounter] = useState(1);


    return (
        <>

            <div><h3>{titleprops}</h3></div>
            <div>{counterCurrentValue}</div>
            <button onClick={() => {setCounter(counterCurrentValue + 1)}}>ADD</button>
            <button onClick={() => {setCounter(counterCurrentValue - 1)}}>REMOVE</button>
        </>

    )

}