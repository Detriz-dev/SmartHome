import {useState} from "react";
import * as React from "react";

interface TestingComponentProps {
    titleprops : string
}

export const BasicComponent: React.FC<TestingComponentProps> = ({ titleprops}) => {

    const [counterCurrentValue, setCounter] = useState(1);

    const increment = () => {
        setCounter( counterCurrentValue + 1)
    }

    const decrement = () => {
        if(counterCurrentValue == 0){setCounter( 0)}

        else {setCounter( counterCurrentValue - 1)}

    }

    const reset = () => {
        setCounter( 0)
    }


    return (
        <>

            <div><h3>{titleprops}</h3></div>
            <div>{counterCurrentValue}</div>
            <button onClick={increment}>ADD</button>
            <button onClick={decrement}>REMOVE</button>
            <button onClick={reset}>RESTART</button>
        </>

    )

}