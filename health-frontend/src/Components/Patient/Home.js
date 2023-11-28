import React, { useEffect } from "react";
import Navbar from "./Navbar";
import "../../styles/Home.css";
import Filter from "./Filter";
import DocumentTable from "./DocumentTable";
import { useState } from "react";
import Profile from "./Profile";
import Upload from "./Upload";
import Requests from "./Requests";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from 'react-router-dom';
import AppointmentCreate from "./AppointmentCreate";
import AppointmentList from "./AppointmentList";
import CheckDoc from "./CheckDoc";

function Home() {
  const torender = ["Filter", "Profile", "UploadDoc", "CheckDoc", "Requests","Appointment","AppointmentList"];
  const axiosPrivate = useAxiosPrivate();
  const [profile, setProfile] = useState("Filter");
  const [userData,setUserData] = useState();
  const navigate = useNavigate();
  const handleProfile = (txt) => {
    setProfile(txt);
  };

  useEffect(()=>{
    const getUserData = async() =>{
      try{
         const response = await axiosPrivate.get("/api/user/profile")
         console.log(response.data);
         setUserData(response.data)
      }
      catch(err){
        console.log(err);
        navigate("/Patient/Login")
      }
    }
    getUserData();
  },[])

  return (
    <div className="Home">
      <Navbar profile={handleProfile} typeemp = "Patient" />
      {torender.map((x) => {
        if (profile === x && profile === "Filter")
          return (
            <div className="main_section">
              <Filter />
              <DocumentTable />
            </div>
          );
        if (profile === x && profile === "Profile") return <Profile data = {userData.user} />
        if(profile === x && profile === "Requests") return <Requests />
        if(profile===x && profile === "Appointment") return <AppointmentCreate />
        if(profile === x && profile === "AppointmentList") return <AppointmentList />
        if (profile === x && profile === "UploadDoc")
          return (
            <div className="UploadModal" id="UploadModal">
              <CheckDoc />
            </div>
          );
          if (profile === x && profile === "CheckDoc")
          return (
            <div className="UploadModal" id="UploadModal">
              <Upload />
            </div>
          );
        return;
      })}
    </div>
  );
}

export default Home;
