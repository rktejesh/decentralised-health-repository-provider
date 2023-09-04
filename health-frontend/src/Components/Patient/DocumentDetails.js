import React, { useState } from "react";
import "../../styles/DocumentDetails.scss"
import { useNavigate } from "react-router-dom";
import { Web3Storage } from 'web3.storage';
import { axiosPrivate } from "../api/axios";
function DocumentDetails({files}) {
  const navigate = useNavigate();
  const [hosID,sethosID] = useState();
  const [docId,setdocID] = useState();
  const [appID,setappID] = useState();
  const [datee,setDatei] = useState();
  const sendFileInfo =  () =>{
    console.log(files);
    if(Object.keys(files).length === 0 ){
        console.log("yes");
        alert("please Upload File");
        return;
    }
    try{
      async function storeFiles () {
        const client = new Web3Storage({ token: process.env.REACT_APP_WEB3STORAGE_TOKEN})
        const cid = await client.put(files)
        console.log('stored files with cid:', cid)  
        const fetchData = async () =>{
          console.log("yes-entered");
          try{
            const response = await axiosPrivate.post("/api/user/createEHR",{
              filename : files[0].name,
              cid : cid ,
              hospital: hosID ,
              doctor : docId ,
              date : datee
            })
            console.log(response.data);
            alert("appointment is successfully done!");
         }
         catch(err){
           console.log(err);
           navigate("/Doctor/Login")
         }
        }
        fetchData();
      }
      storeFiles();
   }
   catch(err){
     console.log(err);
     navigate("/Doctor/Login")
   }
}
  return (
    <div className="DocumentDetailcontainer">
      <div className="DocumentDetail-form-container">
        <div className="DocumentDetail-header">
          <div className="doc-head">Document Details</div>
        </div>

        <form action="#">
          <div className="form-group">
            <div className="input-group">
              <label for="fname">
                Hospital Name <span>*</span>
              </label>
              <input type="text" name="fname" placeholder="Enter hospital name" required onChange={(e)=>{
                  sethosID(e.target.value);
              }}/>
            </div>
            <div className="input-group">
              <label for="lname">
                Doctor Name <span>*</span>
              </label>
              <input type="text" name="lname" placeholder="Enter Doctor name" required onChange={(e)=>{
                  setdocID(e.target.value);
              }}/>
            </div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <label for="address">
                Doc Type <span>*</span>
              </label>
              <input type="text" name="address" placeholder="Appointment Id" required onChange={(e)=>{
                  setappID(e.target.value);
              }}/>
            </div>
            <div className="input-group">
              <label for="postcode">
                Date <span>*</span>
              </label>
              <input type="text" name="postcode" placeholder="DD/MM/YY" required onChange={(e)=>{
                  setDatei(e.target.value);
              }}/>
            </div>
          </div>
        </form>
      </div>
      <button style={{marginTop:"30px"}} className="upload_document_btn" onClick={sendFileInfo}>Submit Files</button>
    </div>
  );
}

export default DocumentDetails;
