import React from 'react'
import Navbar from "../Patient/Navbar"
import "../../styles/Home.css";
import { useState } from 'react';

function HospitalHome() {
  const [profile, setProfile] = useState("Filter");
  const handleProfile = (txt) => {
    setProfile(txt);
  };
  return (
    <div className="Home">
      <Navbar profile={handleProfile} />
      
    </div>
  )
}

export default HospitalHome
