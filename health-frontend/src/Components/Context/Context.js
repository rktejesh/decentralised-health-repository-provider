// import { createContext } from 'react';
// export const AppContext = createContext();

import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [eth_id,seteth_id] = useState();
    useEffect(()=>{
        console.log(auth);
        console.log(eth_id);
    })
    return (
        <AuthContext.Provider value={{ auth, setAuth, eth_id , seteth_id}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;