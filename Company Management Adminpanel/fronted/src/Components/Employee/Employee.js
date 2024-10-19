import React, { useContext, useEffect } from 'react'
import './Employee.css'
import { Link, Routes, Route } from 'react-router-dom'
import ViewEmployee from '../../Pages/ViewEmployee/ViewEmployee'
import AddEmployee from '../../Pages/AddEmployee/AddEmployee'
<<<<<<< HEAD
import { AppContext } from '../../Context'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { setEmployeesList } from '../../Redux/employeeSlice'

const Employee = () => {

    const dispatch = useDispatch()
    const employee = useSelector((state)=> state.employee.employees)

    const getData = async()=> {

        try {

            const response = await axios.get('http://localhost:1800/company/manager/getemployee')
            dispatch(setEmployeesList(response.data.data))
            console.log(response)

        } catch (error) {
            console.error('Error fetching employees:', error);
        }
       
    }
=======

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
>>>>>>> c821c00caa2532c0ce377328905dc5b28e1c94b9

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
