import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../api/axios';
import { useNavigate } from 'react-router-dom';


function TableContent({last , hospital , doctor, date,cid}) {
  const [last_content,setlast_content] = useState("TableHeading_main2")
  const [requestInfo,setrequestInfo] = useState("Request");

  const navigate = useNavigate();
  const requestDocument = async () =>{
    try{
        const response = await axiosPrivate.post("/api/doctor/request-access" , {
            path : cid 
        });
        console.log("yes");
        const ele = document.getElementById("request-btn");
        setrequestInfo("Sent");
     }
     catch(err){
       console.log(err);
       navigate("/Doctor/Login")
     }
  }
  useEffect(()=>{
      if(last==="yes"){
            setlast_content("TableHeading_main2_last");
      }
  },[last])
  return (
    <div className={last_content}>
        <div className='heading_name heading_name_1'>
            {hospital}                     
        </div>
        <div className='heading_name  heading_name_2' >
           {doctor}
        </div>
        <div className='heading_name heading_name_3'>
            {date}
        </div>
        <div className='heading_name heading_name_4'>
            REPORT
        </div>
        <div className='heading_name heading_name_4'>
            <button className='requestaccess-btn' onClick={requestDocument}>{requestInfo}</button>
        </div>
    </div>
  )
}

export default TableContent
