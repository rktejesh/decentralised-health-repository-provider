import React from "react";
import "../styles/Login.css";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInF";
import Panels from "./Panels";
import signInImg from "../img/log.svg"
import signUpImg from "../img/register.svg"
import SignUpDoctor from "./SignUpDoctor";
import SignUpHospital from "./SignUpHospital";
import SignUpDiagnostics from "./SignUpDiagnostics";


function Login({name}) {
    
    const direct_to_signup = ()=>{
        console.log("yes");
        const container = document.querySelector(".container");
        container.classList.add("sign-up-mode");
    }
    const direct_to_signin = ()=>{
        const container = document.querySelector(".container");
        container.classList.remove("sign-up-mode");
    }
    const left_panel_data  = {
      style : "panel left-panel",
      btn_id : "sign-up-btn",
      img_url : signUpImg,
      content : "New Here ?",
      fnc : direct_to_signup
    }
    const right_panel_data  = {
      style : "panel right-panel",
      btn_id : "sign-in-btn",
      img_url : signInImg,
      content : "One of us ?",
      fnc : direct_to_signin
    }
  return (
    <div>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            {name === "Patient" && <SignInForm typeOfUser="Patient"/>}
            {name === "Patient" && <SignUpForm typeOfUser="Patient"/>}

            {name === "Doctor" && <SignInForm typeOfUser="Doctor"/>}
            {name === "Doctor" && <SignUpDoctor typeOfUser="Doctor"/>}

            {name === "Diagnostics" && <SignInForm typeOfUser="Diagnostics"/>}
            {name === "Diagnostics" && <SignUpDiagnostics typeOfUser="Diagnostics"/>}

            {name === "Hospital" && <SignInForm typeOfUser="Hospital"/>}
            {name === "Hospital" && <SignUpHospital typeOfUser="Hospital"/>}
          </div>
        </div>

        <div className="panels-container">
            <Panels data = {left_panel_data}/>
            <Panels data = {right_panel_data} />
        </div>
      </div>
    </div>
  );
}

export default Login;
