import React from 'react'
import './Employee.css'
import { Link, Routes, Route } from 'react-router-dom'
import ViewEmployee from '../../Pages/ViewEmployee/ViewEmployee'
import Header from '../Header/Header'
import Resetpassword from '../../Pages/EmployeePassword/Resetpassword'

const Employee = () => {

    return ( 
        <>
        <Header/>
        
        <div className='owner'>
            
            <div className="aside">
                <div className="nav">
                    <div className="view">
                        <i className="fa-solid fa-eye"></i>
                        <Link to='viewemployee'>VIEW EMPLOYEES</Link>

                    </div>
                    <div className="view">
                    <i className="fa-solid fa-shield-halved"></i>
                        <Link to='resetpassword'>RESET PASSWORD</Link>
                    </div>

                </div>
            </div>
            <div className="main">
                <Routes>
                    <Route path='viewemployee' element={<ViewEmployee />} />
                    <Route path='resetpassword' element={<Resetpassword/>} />
                </Routes>
            </div>
        </div>
        </>
    )
}

export default Employee
