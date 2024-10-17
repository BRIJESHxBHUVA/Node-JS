import React from 'react'
import './ViewEmployee.css'

const ViewEmployee = () => {
  return (
    <div className='viewdata'>
        <table>
          <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Password</th>
                <th>Image</th>
            </tr>
            </thead>
        </table>
    </div>
  )
}

export default ViewEmployee
