import React, { useState } from "react";
import "../../styles/DocumentDetails.scss"
import { useNavigate } from "react-router-dom";
import { Web3Storage } from 'web3.storage';
import axios, { axiosPrivate } from "../api/axios"
import { useEffect } from "react";

import HospitalName from "../Hospital/HospitalName.js";
import AppointmentId from "./AppointmentId.js";
function CheckDocDetails({ files }) {
  const navigate = useNavigate();
  const [appID, setappID] = useState();
  const [dummy,setdummy] = useState();
  const [documentId,setdoctype] = useState();
 

  const sendFileInfo = () => {
    console.log(files);
    if (Object.keys(files).length === 0) {
      console.log("yes");
      alert("please Upload File");
      return;
    }
    try {
      async function storeFiles() {
        const client = new Web3Storage({ token: process.env.REACT_APP_WEB3STORAGE_TOKEN })
        const cid = await client.put(files)
        console.log('stored files with cid:', cid)
        const fetchData = async () => {
          console.log("yes-entered");
          try {
            console.log(files[0].name);
            console.log(appID);
            console.log(documentId);
            const response = await axios.post("http://localhost:5001/decrypt-image", {
              filename: files[0].name,
              cid: cid,
              appointmentId : appID,
              documentId  : documentId
            })
            console.log(response.data);
            alert("appointment is successfully done!");
          }
          catch (err) {
            console.log(err);
            // navigate("/Doctor/Login")
          }
        }
        fetchData();
      }
      storeFiles();
    }
    catch (err) {
      console.log(err);
      // navigate("/Doctor/Login")
    }
  }

  useEffect(()=>{
    const fetchData = async() =>{
         console.log("entered_appointment")
             try{
             console.log("data-fetched-appointment")
             const response = await axiosPrivate.get("/api/user/get-appointments") ;
             console.log(response.data)
             setdummy(response.data.appointments);
         }
         catch(err){
             console.log(err);
         }
     }
     fetchData();
  },[])

  return (
    <div className="DocumentDetailcontainer">
      <div className="DocumentDetail-form-container">
        <div className="DocumentDetail-header">
          <div className="doc-head">Document Details</div>
        </div>

        <form action="#">
          <div className="form-group">
            
            <div className="input-group">
              <div className="input-field">
                <AppointmentId updateappId = {setappID} hospital = {dummy} />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <label for="address">
                Doc Type <span>*</span>
              </label>
              <input type="text" name="address" placeholder="Appointment Id" required onChange={(e) => {
                setdoctype(e.target.value);
              }} />
            </div>

          </div>
        </form>
      </div>
      <button style={{ marginTop: "30px" }} className="upload_document_btn" onClick={sendFileInfo}>Submit Files</button>
    </div>
  );
}

export default CheckDocDetails;
