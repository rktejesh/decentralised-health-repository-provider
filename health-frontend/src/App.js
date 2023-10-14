import React from "react";
import Login from './Components/Login.js'
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Patient/Home.js";
import "./index.css"
import Pick from "./Components/PickPhase/Pick.js";
import Upload from "./Components/Patient/Upload.js";
import Profile from "./Components/Patient/Profile.js";
import HospitalHome from "./Components/Hospital/HospitalHome.js";
import DoctorHome from "./Components/Doctor.js/DoctorHome.js";

function App() {
  return (
        <Routes>
          <Route path='/' element={<Pick />} />
          <Route path='/Doctor/Login' element={<Login name = "Doctor"/>} />
          <Route path='/Patient/Login' element={<Login name = "Patient"/>} />
          <Route path='/Diagnostics/Login' element={<Login name ="Diagnostics"/>} />
          <Route path='/Hospital/Login' element={<Login name="Hospital"/>} />
          <Route path='/Doctor/Login' element={<Login name="Doctor"/>} />
          <Route path= '/Patient/Home' element={<Home />} />
          <Route path= '/Hospital/Home' element={<HospitalHome />} />
          <Route path= '/Doctor/Home' element={<DoctorHome />} />
        </Routes>
  );
}

export default App;
