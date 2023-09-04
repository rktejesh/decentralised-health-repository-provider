import React from 'react'
import Navbar from "../Patient/Navbar"
import "../../styles/Home.css";
import { useState } from 'react';

function DiagnosticHome() {
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

export default DiagnosticHome
