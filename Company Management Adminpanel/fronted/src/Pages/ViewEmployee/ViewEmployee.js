import React, { useEffect, useState } from 'react'
import '../../Pages/ViewOwner/ViewOwner.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployees } from '../../Redux/employeeSlice'
import Loading from '../../Components/Loading/Loading'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



const ViewEmployee = () => {

  const dispatch = useDispatch();
  const {employees, loading, error} = useSelector((state)=> state.employee)


  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch])


  return (
    <div className='viewdata'>
      {!loading ? (
        <div className="alldata">

        
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
          
          {error && <tr><td colSpan='4'>{error}</td></tr>}
        </tbody>
      </table>

      </div>
      ) : (
        <Loading/>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: "300px", whiteSpace: "nowrap" }} 
       />
  
    </div>
  )
}

export default ViewEmployee
