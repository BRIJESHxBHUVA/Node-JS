import React from 'react'
import './Login.css'
import OwnerLogin from '../../Pages/AllLogin/OwnerLogin'
import { Routes, Route, Link } from 'react-router-dom'
import ManagerLogin from '../../Pages/AllLogin/ManagerLogin'
import EmployeeLogin from '../../Pages/AllLogin/EmployeeLogin'
import Forgotpassword from '../../Pages/AdminPassword/Forgotpassword'
import Forgotmanagerpassword from '../../Pages/ManagerPassword/Forgotmanagerpassword'
import Forgotemployeepassword from '../../Pages/EmployeePassword/Forgotemployeepassword'

const Login = () => {
  return (
    <div className='login-main'>
        <div className="login-box">
            <div className="login-option">

                <Link to='/' className='link'><p>Admin</p></Link>
                <Link to='managerlogin' className='link'><p>Manager</p></Link>
                <Link to='employeelogin' className='link'><p>Employee</p></Link>
            
            </div>
            <div className="login-output">

              <Routes>
                <Route path="/" element={<OwnerLogin />} />
                <Route path="/managerlogin" element={<ManagerLogin/>} />
                <Route path="/employeelogin" element={<EmployeeLogin/>} />
                <Route path="/forgotpassword" element={<Forgotpassword/>} />
                <Route path='/forgotmngpassword' element={ <Forgotmanagerpassword/> } />
                <Route path='/forgotemppassword' element={ <Forgotemployeepassword/> } />
              </Routes>
              
            </div>
        </div>
    </div>
  )
}

export default Login
