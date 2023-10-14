import React from 'react'
import Filter from '../Patient/Filter';
import DocumentTable from '../Patient/DocumentTable';
import { useState,useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from 'react-router-dom';
import Profile from '../Patient/Profile';
import Requests from './../Patient/Requests';
import Upload from '../Patient/Upload';
import Navbar from "../Patient/Navbar"

function DoctorHome() {
    const torender = ["Filter", "Profile", "UploadDoc"];
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
           const response = await axiosPrivate.get("/api/Doctor/profile")
           console.log(response.data);
           setUserData(response.data)
        }
        catch(err){
          console.log(err);
          navigate("/Doctor/Login")
        }
      }
      getUserData();
    },[])
  return (
    <div className="Home">
      <Navbar profile={handleProfile} />
      {torender.map((x) => {
        if (profile === x && profile === "Filter")
          return (
            <div className="main_section">
              <Filter />
              <DocumentTable />
            </div>
          );
        if (profile === x && profile === "Profile") return <Profile data = {userData.doctor} />
        if (profile === x && profile === "UploadDoc")
          return (
            <div className="UploadModal" id="UploadModal">
              <Upload />
              
            </div>
          );
        return;
      })}
    </div>
  )
}

export default DoctorHome
