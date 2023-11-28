import React from 'react'
// import {CustomProvider} from 'rsuite';
// import { Dropdown } from 'rsuite';
import '../../styles/HospitalName.css'



function AppointmentId({updateappId,hospital}) {
    console.log(hospital);
  return (
    
        <select  onChange={(e) => {
            console.log("apid" + e.target.value);
            updateappId(e.target.value);
          }} 
           className='dropdown-hospital'>
            {
                hospital!=undefined ? hospital.map((e) => {
                    console.log(e);
                    let d = e._id ;
                    return <option value={d}>{d}</option>;
                    } 
                ) : <></>
            }
        </select>
  )
}

export default AppointmentId