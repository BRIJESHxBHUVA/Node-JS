import React from 'react'
import './Manager.css'
import { Link, Route, Routes } from 'react-router-dom'
import ViewManager from '../../Pages/ViewManager/ViewManager'
import Header from '../Header/Header'
import ViewEmployeeByManager from '../../Pages/ViewEmployee/ViewEmployeeByManager'
import AddEmployee from '../../Pages/AddEmployee/AddEmployee'
import Resetpassword from '../../Pages/ManagerPassword/Resetpassword'


const Manager = () => {
  return (

    <>
    
    <Header/>
    <div className='owner'>
        <div className="aside">
            <div className="nav">
            
                <div className="view">
                <i className="fa-solid fa-eye"></i>
                    <Link to='viewmanager'>VIEW MANAGERS</Link>
                </div>

                <div className="view">
                <i className="fa-solid fa-eye"></i>
                    <Link to='viewemployee'>VIEW EMPLOYEES</Link>
                </div>

                <div className="view">
                    <i className="fa-solid fa-plus"></i>
                    <Link to='addemployee'>ADD EMPLOYEE</Link>
                </div>
               
            </div>
        </div>
        <div className="main">
            <Routes>
                <Route path='viewmanager' element={ <ViewManager/> } />
                <Route path='viewemployee' element={ <ViewEmployeeByManager/> } />
                <Route path='addemployee' element={ <AddEmployee/> } />
                <Route path='resetpassword' element={ <Resetpassword/> } />
                
            </Routes>
        </div>
    </div>

    </>
  )
}

export default Manager
