import React, { useEffect, useState } from 'react'
import "../../styles/Filter.css"
import SearchFilter from './SearchFilter'
import FiletypeFilter from './FiletypeFilter'
import 'rsuite/dist/rsuite.min.css';
import DateRangePicker from 'rsuite/esm/DateRangePicker';
import {CustomProvider} from 'rsuite';
import { Dropdown } from 'rsuite';
import { Button } from 'rsuite';


function Filter() {
  const [dateRange,setdateRange] = useState();
  useEffect(()=>{
    console.log(dateRange);
  })
  return (
    <div className='Filter-main'>
        <SearchFilter />
        <FiletypeFilter />
        <div className='Filter-main-sub'>
          <div style={{marginTop : "25px",marginLeft :"3px",color:"#91969D"}}>Sort by Date</div>
          <CustomProvider theme="dark">
            <DateRangePicker appearance="default" placeholder="From - To" style={{ width: 270 , marginTop : "15px"}} onChange={(date)=>{
              setdateRange(date)
            }}/>
          </CustomProvider>
        </div>
        <div className='Filter-main-sub'>
          <div style={{marginTop : "25px",marginLeft :"3px",color:"#91969D"}}>Sort by Document Type</div>
          <CustomProvider theme="dark">
            <Dropdown title="Select Document Type" style={{marginTop :"15px"}}>
              <Dropdown.Item >Prescription</Dropdown.Item>
              <Dropdown.Item>Diagnostic Report</Dropdown.Item>
              <Dropdown.Item>OP Consultation</Dropdown.Item>
              <Dropdown.Item>Discharge Summary</Dropdown.Item>
              <Dropdown.Item>Immunization Record</Dropdown.Item>
              <Dropdown.Item>Health Documentation Record</Dropdown.Item>

            </Dropdown> 
          </CustomProvider>
        </div>
        
    </div>
  )
}

export default Filter
