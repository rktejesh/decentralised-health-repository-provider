import React from 'react'
// import {CustomProvider} from 'rsuite';
// import { Dropdown } from 'rsuite';
import '../../styles/HospitalName.css'

function AssignDropdown({updatedata,hospital,type}) {
  console.log(hospital)
  return (
        
        <select  onChange={(e) => {
            console.log("1" + e.target.value);
            updatedata(e.target.value);
          }} 
           className='dropdown-hospital'>
            {
                type=="hospital" ? hospital.map((e) => {
                    return <option value={e}>{e}</option>
                }) : hospital.map((e) => {
                  return <option value={e}>{e}</option>
              })
            }
            {/* <option >Select Hospital ID</option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option> */}
        </select>
  )
}

export default AssignDropdown