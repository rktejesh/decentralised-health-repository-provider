import React, { useEffect, useState } from 'react'
import '../../styles/DocumentTable.css'
import TableHeading from './TableHeading'
import TableContent from './TableContent'
import { axiosPrivate } from '../api/axios'
import { useNavigate } from 'react-router-dom'

function DocumentTable() {
  const [dummy,setDummy] = useState([]);
  const tableh = ["HOSPITAL NAME" ,"DOCTOR NAME","DATE","REPORT","Acess"];
  const navigate = useNavigate();
  useEffect(()=>{
      const fetchData = async() =>{
        try{
          const response = await axiosPrivate.get("/api/hospital/get-docs") ;
          console.log(response.data);
          setDummy(response.data) ;
       }
       catch(err){
         console.log(err);
         navigate("/Doctor/Login")
       }
      }
      fetchData();
  },[])
  return (
    <div className='DocumentTable'>
        <TableHeading tableh = {tableh}/>
        {
              dummy.map((x,index)=>{
                return dummy.length-1 === index   ? 
               <TableContent last="yes" hospital = {x.hospital} doctor = {x.doctor} date = {x.date} cid = {x._id}/> : <TableContent last="No" hospital = {x.hospital} doctor = {x.doctor} date = {x.date} cid = {x._id}/>
            })
        }
        
    </div>
  )
}
export default DocumentTable
