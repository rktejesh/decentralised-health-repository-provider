"use client";
import React from "react";
import "../../styles/Navbar.css";
import profileImg from "../../img/ramanuj.jpg";
import { NavLink } from "react-router-dom";
function NavbarMain({profile , typeemp }) {
  const profile_drop = ()=>{
     const v = document.getElementById("profile_drop");
     v.classList.toggle("make_visible");
  }

  const DisplayComponentsofNavbar = (x)=>{
    console.log(x);
    profile(x) ;
  }

  return (
    <div className="Navbar_main">
      <div className="navbar_logo">
        <div>
          <img alt=""></img>
        </div>
        <div>PROJECT NAME</div>
      </div>
      <div className="Nav_link">
        <NavLink style={{ textDecoration: "none" }} onClick={() => DisplayComponentsofNavbar("Filter")}>
          <div className="Nav_link_sub">Home</div>
        </NavLink>
        {typeemp=="Patient" ? <NavLink style={{ textDecoration: "none" }}  onClick={() => DisplayComponentsofNavbar("Appointment")}>
          <div className="Nav_link_sub">Book Appointment</div>
        </NavLink> : <></>}
        <NavLink style={{ textDecoration: "none" }} onClick={() => DisplayComponentsofNavbar("Requests")}>
          <div className="Nav_link_sub"  >Requests <div className="request_notification">1</div></div>
        </NavLink>
        <NavLink style={{ textDecoration: "none" }} onClick={() => DisplayComponentsofNavbar("AppointmentList")}>
          <div className="Nav_link_sub"  > Appointments </div>
        </NavLink>
        <NavLink style={{ textDecoration: "none" }} onClick={() => DisplayComponentsofNavbar("Profile")} >
          <div className="Nav_link_sub">Profile</div>
        </NavLink>
        {typeemp=="Hospital" ?<NavLink style={{ textDecoration: "none" }} onClick={() => DisplayComponentsofNavbar("AssignDoctor")}>
          <div className="Nav_link_sub">Assign Doctor</div>
        </NavLink> : <></>}
      </div>

      <div className="Nav_profile">
      <div onClick={() => DisplayComponentsofNavbar("CheckDoc")}>
         { <NavLink style={{ textDecoration: "none" }}>
            <div className="Nav_link_sub">
              <button className="upload_document_btn">Check Document</button>
            </div>
          </NavLink> }
        </div>
        <div onClick={() => DisplayComponentsofNavbar("UploadDoc")}>
         { typeemp == "Doctor" ?  <NavLink style={{ textDecoration: "none" }}>
            <div className="Nav_link_sub">
              <button className="upload_document_btn">Upload Document</button>
            </div>
          </NavLink> : <></> }
        </div>
        <div className="profile" onClick={profile_drop}>
          <img className="profileImg" src={profileImg} alt=""></img>
        </div>
        <div className="profile_dropdown" id="profile_drop">
          <div className="profile_dropdown_sub">
            <div className="profile_open" onClick={() => DisplayComponentsofNavbar("Profile")}><div style={{paddingLeft:"10px"}}  >Profile</div></div>
            <div className="log_out"><div style={{paddingLeft:"10px"}}>Log out</div></div>
          </div>
        </div>
      </div>
    </div>  
  );
}

export default NavbarMain;
