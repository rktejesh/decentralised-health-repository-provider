import React from "react";
import PickCard from "./PickCard";
import "../../styles/Pick/Pick.css"
import doctorImg from "../../img/doctor.jpg"
import patientImg from '../../img/patient.jpg'
import diagnosticImg from "../../img/diagnostics.jpg"
import hospitalImg from "../../img/hospital.jpg"
function Pick() {
  const data = [
    {
      name: "Doctor",
      img: doctorImg,
      url:"/Doctor/Login"
    },
    {
      name: "Paitent",
      img: patientImg,
      url:"/Patient/Login"
    },
    {
      name: "Diagnostics",
      img: diagnosticImg,
      url:"/Diagnostics/Login"
    },
    {
      name : "Hospital",
      img  : hospitalImg,
      url:"/Hospital/Login"
    }
  ];
  return (
    <div className="Pick-main">
      <div className="Pick-main-text">
          Who's Signing In ?
      </div>
      <div className="Pick-sub">
      {
        data.map((data)=>{
          return <PickCard cardData={data} />
        })
      }
      </div>
    </div>
  );
}

export default Pick;
