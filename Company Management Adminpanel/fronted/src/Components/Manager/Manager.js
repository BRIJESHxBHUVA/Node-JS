import React from 'react'
import './Manager.css'
import { Link, Route, Routes } from 'react-router-dom'
import ViewManager from '../../Pages/ViewManager/ViewManager'
import AddManager from '../../Pages/AddManager/AddManager'
import Header from '../Header/Header'
import ViewEmployeeByManager from '../../Pages/ViewEmployee/ViewEmployeeByManager'
import AddEmployee from '../../Pages/AddEmployee/AddEmployee'

const Manager = () => {
  return (

    <>
    
    <Header/>
    <div className='owner'>
        <div className="aside">
            <div className="nav">
            
                <div className="view">
                <i className="fa-solid fa-eye"></i>
                    <Link to='viewmanager'><a href="">VIEW MANAGERS</a></Link>
                </div>

                <div className="view">
                <i className="fa-solid fa-eye"></i>
                    <Link to='viewemployee'><a href="">VIEW EMPLOYEES</a></Link>
                </div>

                <div className="view">
                    <i className="fa-solid fa-plus"></i>
                    <Link to='addemployee'><a href="">ADD EMPLOYEE</a></Link>
                </div>
            
                <div className="view">
                <i class="fa-solid fa-shield-halved"></i>
                    <Link><a href="">RESET PASSWORD</a></Link>
                </div>
               
            </div>
        </div>
        <div className="main">
            <Routes>
                <Route path='viewmanager' element={ <ViewManager/> } />
                <Route path='viewemployee' element={ <ViewEmployeeByManager/> } />
                <Route path='addemployee' element={ <AddEmployee/> } />
            </Routes>
        </div>
    </div>

    </>
  )
}

export default Manager
