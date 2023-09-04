import React from 'react'
import "../../styles/Requests.css"

function Requests() {
 const render_requests = [1,1,1];
  return (
    <div className='requests-main'>
        {render_requests.map((x)=>{
            return <div className='requests-each'>
            <div className='requests-decision'>
                <div className='requests-name'>
                    Request from Doctor Prasad
                </div>
                <div className='requests-btns-main'>
                    <button className='requests-btn1'>Accept</button>
                    <button className='requests-btn2'>Reject</button>
                </div>
            </div>
            <div className='requests-info'>
                <div className='requests-info-sub'>
                    Doctor's Name : Prasad 
                </div>
                <div className='requests-info-sub'>
                    Hospital Name : Yashodha
                </div>
                <div className='requests-info-sub'>
                    Key : 0xdfe12345wer976
                </div>
            </div>
        </div>
        })}
    </div>
  )
}

export default Requests
