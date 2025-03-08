import { useState } from "react";
import { createContext } from "react";

export let CounterContext=createContext();


export function CounterContextProvider(props){

    const [Counter, setCounter] = useState(0)

function changeCounter(){
    setCounter(Math.random())
}
    return  <CounterContext.Provider value={ {Counter , changeCounter }  }>
   
        {props.children}
    </CounterContext.Provider>
   
}
