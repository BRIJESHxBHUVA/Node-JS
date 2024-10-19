import React, { useContext, useEffect, useState } from 'react'
import './ViewEmployee.css'
import axios from 'axios'
import { AppContext } from '../../Context'
import { useDispatch, useSelector } from 'react-redux'
import { setEmployeesList } from '../../Redux/employeeSlice'

const ViewEmployee = () => {

  const dispatch = useDispatch();
  const employees = useSelector((state)=> state.employee.employees)

  const getEmployeeData = async () => {
    try {
      const response = await axios.get('http://localhost:1800/company/employee/getemployee')
        .then((res) => {
          dispatch(setEmployeesList(res.data.data))
      
        })
        console.log(response)
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
            employees?
            employees.map((e, i) => (
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
