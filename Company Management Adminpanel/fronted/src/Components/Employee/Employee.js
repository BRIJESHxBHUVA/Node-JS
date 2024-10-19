import React from 'react'
import './Employee.css'
import { Link, Routes, Route } from 'react-router-dom'
import ViewEmployee from '../../Pages/ViewEmployee/ViewEmployee'
import AddEmployee from '../../Pages/AddEmployee/AddEmployee'

const Employee = () => {

    return ( 
        <div className='owner'>
            <div className="aside">
                <div className="nav">
                    <div className="view">
                        <i className="fa-solid fa-eye"></i>
                        <a href=""><Link to='viewemployee'>VIEW EMPLOYEES</Link></a>

                    </div>
                    <div className="view">
                        <i className="fa-solid fa-plus"></i>
                        <a href=""><Link to='addemployee'>ADD EMPLOYEES</Link></a>
                    </div>
                    <div className="view">
                        <i className="fa-solid fa-trash"></i>
                        <a href="">DELETE EMPLOYEES</a>
                    </div>
                    <div className="view">
                        <i className="fa-solid fa-eye"></i>
                        <a href=""><Link>RESET PASSWORD</Link></a>
                    </div>

                </div>
            </div>
            <div className="main">
                <Routes>
                    <Route path='viewemployee' element={<ViewEmployee />} />
                    <Route path='addemployee' element={<AddEmployee />} />
                </Routes>
            </div>
        </div>
    )
}

export default Employee
