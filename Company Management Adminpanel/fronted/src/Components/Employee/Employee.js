import React from 'react'
import './Employee.css'
import { Link, Routes, Route } from 'react-router-dom'
import ViewEmployee from '../../Pages/ViewEmployee/ViewEmployee'
import Header from '../Header/Header'

const Employee = () => {

    return ( 
        <>
        <Header/>
        
        <div className='owner'>
            
            <div className="aside">
                <div className="nav">
                    <div className="view">
                        <i className="fa-solid fa-eye"></i>
                        <Link to='viewemployee'><a href="">VIEW EMPLOYEES</a></Link>

                    </div>
                    <div className="view">
                    <i class="fa-solid fa-shield-halved"></i>
                        <Link><a href="">RESET PASSWORD</a></Link>
                    </div>

                </div>
            </div>
            <div className="main">
                <Routes>
                    <Route path='viewemployee' element={<ViewEmployee />} />
                </Routes>
            </div>
        </div>
        </>
    )
}

export default Employee
