import { createContext } from "react";
import { useState } from "react";

const StoreContext = createContext(null);


export const StoreContextProvider=(props)=>{
    const [username, setUsername] = useState('Guest');
    const [password, setPassword] = useState('Password');
    
    return (
        <StoreContext.Provider value={{setUsername,username,password,setPassword}}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContext;