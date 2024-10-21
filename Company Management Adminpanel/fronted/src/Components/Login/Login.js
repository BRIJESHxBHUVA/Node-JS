import React from 'react'
import './Login.css'
import OwnerLogin from '../../Pages/AllLogin/OwnerLogin'
import { Routes, Route, Link } from 'react-router-dom'
import ManagerLogin from '../../Pages/AllLogin/ManagerLogin'
import EmployeeLogin from '../../Pages/AllLogin/EmployeeLogin'

const Login = () => {
  return (
    <div className='login-main'>
        <div className="login-box">
            <div className="login-option">

                <Link to='adminlogin'><p>Admin</p></Link>
                <Link to='managerlogin'><p>Manager</p></Link>
                <Link to='employeelogin'><p>Employee</p></Link>
            
            </div>
            <div className="login-output">

              <Routes>
                <Route path="/adminlogin" element={<OwnerLogin />} />
                <Route path="/managerlogin" element={<ManagerLogin/>} />
                <Route path="/employeelogin" element={<EmployeeLogin/>} />
              </Routes>
              
            </div>
        </div>
    </div>
  )
}

export default Login
