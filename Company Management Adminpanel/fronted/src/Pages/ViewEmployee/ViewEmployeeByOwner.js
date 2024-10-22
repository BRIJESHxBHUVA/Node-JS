import React, {useState, useEffect} from 'react'
import './ViewEmployee.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployees } from '../../Redux/ownerSlice'
import { deleteEmployee } from '../../Redux/ownerSlice'

const ViewEmployeeByOwner = () => {

    const dispatch = useDispatch();
    const {employees, loading, error} = useSelector((state)=> state.owner)
  
  
    useEffect(() => {
      dispatch(fetchEmployees())
    }, [dispatch])
  
    const removeEmployee = (id) => {
      dispatch(deleteEmployee(id))
      console.log(id)
    }


  return (
    <div className='viewdata'>
      
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Image</th>
          <th>Action</th>
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
                <td onClick={()=>{removeEmployee(el._id)}}>Delete</td>
              </tr>
            )) 
        }
        {loading && <tr><td colSpan='5'>Loading...</td></tr>}
        {error && <tr><td colSpan='5'>{error}</td></tr>}

      </tbody>
    </table>
  </div>
  )
}

export default ViewEmployeeByOwner
