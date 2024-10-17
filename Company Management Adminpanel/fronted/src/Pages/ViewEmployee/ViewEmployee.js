import React, { useContext, useEffect, useState } from 'react'
import './ViewEmployee.css'
import axios from 'axios'
import { AppContext } from '../../Context'

const ViewEmployee = () => {

  const { getemployee, setGetemployee } = useContext(AppContext)

  const getEmployeeData = async () => {
    try {
      const response = await axios.get('http://localhost:1800/company/employee/getemployee')
        .then((res) => {
          setGetemployee(res.data.data)
          console.log(getemployee)
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getEmployeeData()
  }, [])


  return (
    <div className='viewdata'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {
            getemployee ?
              getemployee.map((e, i) => (
                <tr key={i}>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.phone}</td>
                  <td><img src={`http://localhost:1800/images/employee/${e.image}`} height='100' width='100' alt="" /></td>
                </tr>
              )) :
              <p>loading....</p>
          }
        </tbody>
      </table>
    </div>
  )
}

export default ViewEmployee
