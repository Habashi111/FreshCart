import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";

 export let UserContext=createContext();
 export function UserContextProvider(props){

const [UserLogin, setUserLogin] = useState(null)



useEffect(()=>{

    if(localStorage.getItem("token")){
        setUserLogin(localStorage.getItem("token"))
    }
}



,[])
    return <UserContext.Provider value={ {UserLogin,setUserLogin } }>
{props.children}
    </UserContext.Provider>
}