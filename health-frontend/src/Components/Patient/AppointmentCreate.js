import React from 'react'
import "../../styles/DocumentDetails.scss"
function AppointmentCreate() {
  return (
    <div style={{marginTop : "50px" , width:"50%"}} className="DocumentDetailcontainer" >
      <div className="DocumentDetail-form-container extra-width">
        <div className="DocumentDetail-header">
          <div className="doc-head">Appointment Details</div>
        </div>

        <form action="#">
          <div className="form-group">
            <div className="input-group">
              <label for="fname">
                Hospital Name <span>*</span>
              </label>
              <input type="text" name="fname" placeholder="Enter hospital name" required/>
            </div>
            <div className="input-group">
              <label for="lname">
                Doctor Name <span>*</span>
              </label>
              <input type="text" name="lname" placeholder="Enter Doctor name" required/>
            </div>
          </div>

          <div className="form-group">
            <div className="input-group" style={{padding:"0px"}}>
              <label for="address" >
              Description <span>*</span>
              </label>
              <input type="text" name="address" placeholder="Description" required style={{width : "400px" , height : "150px"}}/>
            </div>
          </div>
        </form>
      </div>
      <button style={{marginTop:"30px"}} className="upload_document_btn">Book Appointment</button>
    </div>
  )
}

export default AppointmentCreate
