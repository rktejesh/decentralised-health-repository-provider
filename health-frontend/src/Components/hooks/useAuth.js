import { useContext } from "react";
import AuthContext from "../Context/Context.js"

const useAuth = ()=>{
    return useContext(AuthContext);
}

export default useAuth ;