import React from 'react'

function TableHeading({tableh}) {
  return (
    <div className='TableHeading_main'>
        {/* {
            tableh.map((e)=>{
                return (<div className='heading_name heading_name_1'>
                            {e}
                        </div>)
            })
        } */}
        <div className='heading_name heading_name_1'>
            {tableh[0]}
        </div>
        <div className='heading_name  heading_name_2' >
            {tableh[1]}
        </div>
        <div className='heading_name heading_name_3'>
            {tableh[2]}
        </div>
        <div className='heading_name heading_name_4'>
            {tableh[3]}
        </div>
        <div className='heading_name heading_name_4'>
            {tableh[4]}
        </div>
    </div>
  )
}
export default  TableHeading
