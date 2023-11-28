import React from 'react'
import "../../styles/DocumentDetails.scss"
import { useState, useRef, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import HospitalName from "../Hospital/HospitalName.js";
import {CustomProvider} from 'rsuite';
import { DatePicker } from "rsuite"; 
import { useNavigate } from 'react-router-dom'

function AppointmentCreate() {
  const [hospitalId, sethospitalId] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [hospitalName,sethospitalName] = useState([]);
  const [hNameS,sethospitalNameSelected] = useState();
  const [hIdS,sethospitalIDSlected] = useState();
  const [map1 , setmap1] = useState();
  const [dateRange,setdateRange] = useState();
  const [desc, setDesc] = useState();
  const navigate = useNavigate();

  const getHospitalData = async () =>{
    await axiosPrivate
      .get("/api/hospital/get-hospitals")
      .then((res) => {
        const map_d = new Map();
        console.log(res.data.hospital.name);
        console.log(res.data.hospital.registrationId);
        let data_name = [] ; 
        let data_id = [] ;
        data_name.push("select hospital name")
        data_id.push("0000")
        for(let i = 0; i < res.data.hospital.length; i++) {
          data_name.push(res.data.hospital[i].name)
          data_id.push(res.data.hospital[i].registrationId);
        }
        for(let i=0;i<data_name.length;i++){
          map_d.set(data_name[i],data_id[i]);
        }
        console.log(map_d);
        setmap1(map_d);
        sethospitalName(data_name);
        sethospitalId(data_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const Loginto = async () => {
    console.log("clicked Login");
    console.log(hIdS);
    console.log(dateRange);
    console.log(desc);

    await axiosPrivate
      .post("/api/user/createAppointment", {
        hospitalId: hIdS,
        description: desc,
        date: dateRange
      }).then(()=>{
        // navigate('/')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHospitalData();
    console.log(dateRange);
  }, [hNameS]);

  return (
    <div style={{ marginTop: "50px", width: "50%" }} className="DocumentDetailcontainer" >
      <div className="DocumentDetail-form-container extra-width">
        <div className="DocumentDetail-header">
          <div className="doc-head">Appointment Details</div>
        </div>

        <form action="#">
          <div className="form-group">
            <div className="input-field">
              
              {/* <input
                type="text"
                placeholder="Enter your Hospital ID"
                value={hospitalId}
                onChange={(e) => {
                  sethospitalId(e.target.value);
                }}
              /> */}
              <HospitalName updatehosip={sethospitalNameSelected} hospital={hospitalName} map1={map1} updatehosid={sethospitalIDSlected} />
            </div>
            <CustomProvider theme="dark">
            <DatePicker appearance="default" placeholder="From - To" style={{ width: 270 , marginTop : "15px"}} format="yyyy-MM-dd HH:mm" onChange={(date)=>{
              setdateRange(date)
            }}/>
          </CustomProvider>
            {/* <div className="input-group">
              <label for="fname">
                Hospital Name <span>*</span>
              </label>
              <input type="text" name="fname" placeholder="Enter hospital name" required/>
            </div> */}
            {/* <div className="input-group">
              <label for="lname">
                Doctor Name <span>*</span>
              </label>
              <input type="text" name="lname" placeholder="Enter Doctor name" required/>
            </div> */}
          </div>

          <div className="form-group">
            <div className="input-group" style={{ padding: "0px" }}>
              <label for="address" >
                Description <span>*</span>
              </label>
              <input type="text" name="address" placeholder="Description" required style={{ width: "400px", height: "150px" }} onChange={(e)=> {setDesc(e.target.value)}} />
            </div>
          </div>
        </form>
      </div>
      <button style={{ marginTop: "30px" }} className="upload_document_btn" onClick={Loginto}>Book Appointment</button>
    </div>
  )
}

export default AppointmentCreate
