import React from 'react'
// import {CustomProvider} from 'rsuite';
// import { Dropdown } from 'rsuite';
import '../../styles/HospitalName.css'

function HospitalName({updatehosip,hospital,map1,updatehosid}) {
  return (
    
        <select  onChange={(e) => {
            console.log(map1);
            console.log("1" + e.target.value);
            console.log("id" + map1.get(e.target.value))
            updatehosip(e.target.value);
            updatehosid(map1.get(e.target.value));
          }} 
           className='dropdown-hospital'>
            {
                hospital.map((e) => {
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

export default HospitalName