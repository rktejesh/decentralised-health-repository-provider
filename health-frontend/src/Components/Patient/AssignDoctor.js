import React from 'react'
import "../../styles/DocumentDetails.scss"
import { useState, useRef, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import HospitalName from "../Hospital/HospitalName.js";
import {CustomProvider} from 'rsuite';
import { DatePicker } from "rsuite"; 
import { useNavigate } from 'react-router-dom'
import AssignDropdown from './AssignDropdown.js';

function AssignDoctor() {
  const axiosPrivate = useAxiosPrivate();
  const [hIdS,sethospitalIDSlected] = useState();
  const [doctors,setdoctors] = useState();
  const [hospital,sethospitals] = useState();
  const [docId,setdoctorIdselected] = useState(); 
  const navigate = useNavigate();
  console.log("Assign Doctor Entered")
  const getData = async () =>{
    await axiosPrivate
      .get("/api/hospital/get-appointments")
      .then((res) => {
        console.log(res);
        console.log(res.data.doctors);
        console.log(res.data.appointments);
        let data_name = [] ; 
        let data_id = [] ;
        data_name.push("select doctorId ");
        data_id.push("select appointmentId");
        for(let i = 0; i < res.data.appointments.length; i++) {
          data_id.push(res.data.appointments[i]._id)
        }
        for(let i=0;i<res.data.doctors.length;i++){
          data_name.push(res.data.doctors[i].medicalRegistrationNo)
        }
        sethospitals(data_id);
        setdoctors(data_name);
        console.log(hospital)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const Loginto = async () => {
    console.log("clicked Login");
    console.log(hIdS);
    console.log(docId);

    await axiosPrivate
      .post("/api/hospital/assign-doctor", {
        appointmentId: hIdS,
        doctorId: docId,
      }).then(()=>{
        // navigate('/')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [hospital]);

  return (
    <div style={{ marginTop: "50px", width: "50%" }} className="DocumentDetailcontainer" >
      <div className="DocumentDetail-form-container extra-width">
        <div className="DocumentDetail-header">
          <div className="doc-head">Assign Doctor </div>
        </div>

        <form action="#">
          <div className="form-group">
            <div className="input-field">
              { hospital!=undefined? <AssignDropdown updatedata={sethospitalIDSlected} hospital={hospital} type = {"hospital"} /> : <></>}
            </div> 
          </div>

          <div className="form-group">
            <div className="input-field">
                <AssignDropdown updatedata={setdoctorIdselected} hospital = {doctors} type = {"Doctor"}  />
            </div>
          </div>
        </form>
      </div>
      <button style={{ marginTop: "30px" }} className="upload_document_btn" onClick={Loginto}>Assign Doctor</button>
    </div>
  )
}

export default AssignDoctor
