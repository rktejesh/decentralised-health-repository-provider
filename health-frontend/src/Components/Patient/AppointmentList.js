import React from 'react'
import Filter from './Filter'
import DocumentTable from './DocumentTable'
import DocumentTableAppointment from './DocumentTableAppointment'

function AppointmentList() {
  return (
    <div className="main_section ">
        {/* <Filter /> */}
        <DocumentTableAppointment />
    </div>
  )
}

export default AppointmentList
