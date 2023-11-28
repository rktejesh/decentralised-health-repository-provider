import React from "react";
import { useState, useRef, useEffect } from "react";
import { BsEnvelopeAt, BsShieldLock } from "react-icons/bs";
import { BiUserPin } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import {CustomProvider} from 'rsuite';
import { Dropdown } from 'rsuite';
import HospitalName from "./Hospital/HospitalName";

function SignUpHospital({ typeOfUser }) {
  const { eth_id } = useAuth();
  const { setAuth } = useAuth();
  const inputref_ph_no = useRef(null);
  const navigate = useNavigate();
  const [hospitalId, sethospitalId] = useState();
  const [medicalRegistrationNo, setmedicalRegistrationNo] = useState();
  const [specialisation, setspecialisation] = useState();
  const [Username, setUsername] = useState("");
  const [ph_no, setph_no] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setotpSent] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [hospitalName,sethospitalName] = useState([]);
  const [hNameS,sethospitalNameSelected] = useState();
  const [hIdS,sethospitalIDSlected] = useState();
  const [map1 , setmap1] = useState();

  const displayStatement = () => {
    const ele = document.getElementById("alert-valid");
    ele.classList.remove("alert-valid-false");
    ele.classList.add("alert-valid-true");
  }
  const displayError = () => {
    const ele = document.getElementById("alert-valid");
    ele.classList.remove("alert-valid-true");
    ele.classList.add("alert-valid-false");
  }
  const getHospitalData = async () =>{
    await axiosPrivate
      .get("/api/hospital/get-hospitals")
      .then((res) => {
        const map_d = new Map();
        console.log(res.data.hospital);
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
  const requestingOtp = async () => {
    console.log("asdf");
    console.log(ph_no);
    console.log(eth_id);
    await axiosPrivate
      .post("/api/user/login", {
        mobile: ph_no,
        eth_id: eth_id,
      })
      .then((res) => {
        console.log(res);
        if (res.data.resultCode === "00048") {
          displayStatement();
          setotpSent("Otp Sent");
        }
      })
      .catch((err) => {
        console.log(err);
        setotpSent("Invalid Number");
        displayError();
        // navigate("/Doctor/Login")
      });
  };
  const Data = async (event) => {
    console.log("clicked Data");
    await axiosPrivate
      .post("/api/user/verify-mobile", {
        eth_id: eth_id,
        mobile: ph_no,
        code: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.resultCode === "00035") {
          displayStatement();
          setotpSent("Otp Verified");
        }
      })
      .catch((err) => {
        setotpSent("Invalid OTP");
        displayError()
        // navigate("/Doctor/Login")
      });
    return false;
  };

  const Loginto = async () => {
    console.log("clicked Login");
    console.log(Username);
    console.log(ph_no);
    console.log(eth_id);
    console.log(typeOfUser);
    console.log(specialisation);
    console.log(medicalRegistrationNo);
    console.log(hospitalId);


    await axiosPrivate
      .post("/api/doctor/register", {
        eth_id: eth_id,
        name: Username,
        mobile: ph_no,
        hospitalId: hIdS,
        medicalRegistrationNo: medicalRegistrationNo,
        specialisation: specialisation
      })
      .then((res) => {
        if (res) {
          const accessToken = res.data.accessToken;
          setAuth({ Username, hospitalId, specialisation, medicalRegistrationNo, accessToken });
          navigate("/Doctor/Home");
        }
      })
      .catch((err) => {
        setotpSent("Invalid OTP");
        displayError();
        console.log(err);
        navigate("/Doctor/Login")
      });
    return false;
  };
  useEffect(() => {
    getHospitalData();
    inputref_ph_no.current.focus();
  }, [hNameS]);

  return (
    <form action="#" className="sign-up-form">
      <h2 className="title">Sign up</h2>
      <div className="input-field">
        <BiUserPin
          className="input-field-icons"
          style={{ marginLeft: "10px" }}
        />
        <input
          type="text"
          placeholder="Name"
          value={Username}
          ref={inputref_ph_no}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className="input-field">
        <BiUserPin
          className="input-field-icons"
          style={{ marginLeft: "10px" }}
        />
        {/* <input
          type="text"
          placeholder="Enter your Hospital ID"
          value={hospitalId}
          onChange={(e) => {
            sethospitalId(e.target.value);
          }}
        /> */}
        <HospitalName updatehosip = {sethospitalNameSelected} hospital = {hospitalName} map1 = {map1} updatehosid = {sethospitalIDSlected}/>
      </div>
      <div className="input-field">
        <BsEnvelopeAt
          className="input-field-icons"
          style={{ marginLeft: "10px" }}
        />
        <input
          type="text"
          placeholder="Enter Registration No"
          value={medicalRegistrationNo}
          ref={inputref_ph_no}
          onChange={(e) => {
            setmedicalRegistrationNo(e.target.value);
          }}
        />
      </div>
      <div className="input-field">
        <BsEnvelopeAt
          className="input-field-icons"
          style={{ marginLeft: "10px" }}
        />
        <input
          type="text"
          placeholder="Enter specialization"
          value={specialisation}
          ref={inputref_ph_no}
          onChange={(e) => {
            setspecialisation(e.target.value);
          }}
        />
      </div>
      <div className="input-field">
        <BsShieldLock
          className="input-field-icons"
          style={{ marginLeft: "10px" }}
        />
        <input
          type="text"
          placeholder="Enter phone no"
          value={ph_no}
          onChange={(e) => {
            setph_no(e.target.value);
          }}
        />
        <button className="send-otp-btn" onClick={requestingOtp}>
          Send OTP
        </button>
      </div>
      <div className="input-field">
        <BsShieldLock
          className="input-field-icons"
          style={{ marginLeft: "10px" }}
        />
        <input
          type="password"
          placeholder="Enter your OTP"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="OTP-verify-btn send-otp-btn" onClick={Data}>
          Confirm OTP
        </button>
      </div>
      <input type="submit" className="btn" value="Sign up" onClick={Loginto} />
      <div id="alert-valid" className="alert-valid">{`*${otpSent}`}</div>
      {/* <div id="alert-valid-otp">{`${Confirmotp}`}</div> */}
    </form>
  );
}
export default SignUpHospital;
