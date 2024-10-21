import React, { useEffect, useState } from 'react'
import './ViewEmployee.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployees } from '../../Redux/employeeSlice'


const ViewEmployee = () => {

  const dispatch = useDispatch();
  const {employees, loading, error} = useSelector((state)=> state.employee)


  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch])


  return (
    <div className='viewdata'>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
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
            employees.map((el, index) => (
                <tr key={index}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.phone}</td>
                  <td><img src={`http://localhost:1800/images/employee/${el.image}`} height='100' width='100' alt="" /></td>
                </tr>
              )) 
          }
        </tbody>
      </table>
    </div>
  )
}

export default ViewEmployee
