import React, { useEffect, useState } from 'react'
import '../../styles/DocumentTable.css'
import TableHeading from './TableHeading'
import TableContent from './TableContent'
import { axiosPrivate } from '../api/axios'
import { useNavigate } from 'react-router-dom'
import TableContentAppointment from './TableContentAppointment'
import TableHeadingAppointment from './TableHeadingAppointment'

function DocumentTableAppointment() {
  const [docapp,setDummy] = useState([]);
  const [docnames,setdocnames] = useState([]);
  const [hosnames,sethosnames] = useState([]);

  const tableh = ["HOSPITAL NAME" ,"DOCTOR NAME","DATE","TIME"];
  const navigate = useNavigate();
  useEffect(()=>{
       const fetchData = async() =>{
                try{
                console.log("data-fetched-appointment")
                const response = await axiosPrivate.get("/api/user/get-appointments") ;
                console.log(response.data)
                setDummy(response.data.appointments) ;
                setdocnames(response.data.doctorNames);
                sethosnames(response.data.hospitalNames);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchData();
  },[])
  return (
    <div className='DocumentTable'>
        <TableHeadingAppointment tableh={tableh} />
        {
            docapp.map((x,index)=>{
                return docapp.length-1 === index   ? 
               <TableContentAppointment last="yes" hospital = {hosnames[index]} doctor = {docnames[index]} date = {new Date(x.time).toLocaleDateString('en-US', {
                timeZone: 'Asia/Kolkata',
                hourCycle: 'h23',
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            })} time = {new Date(x.time).toLocaleTimeString('en-US')}/> : <TableContentAppointment last="No"  hospital = {hosnames[index]} doctor = {docnames[index]} date = {new Date(x.time).toLocaleDateString('en-US', {
              timeZone: 'Asia/Kolkata',
              hourCycle: 'h23',
              year: "numeric",
              month: "2-digit",
              day: "2-digit"
          })} time = {new Date(x.time).toLocaleTimeString('en-US')}/>
            })
        }
        
    </div>
  )
}
export default DocumentTableAppointment

