import React, { useEffect } from 'react'
import './Owner.css'
import { Route, Routes, Link } from 'react-router-dom'
import ViewOwner from '../../Pages/ViewOwner/ViewOwner'
import ViewManager from '../../Pages/ViewManager/ViewManager'
import ViewEmployee from '../../Pages/ViewEmployee/ViewEmployee'
import AddOwner from '../../Pages/AddOwner/AddOwner'
import Header from '../Header/Header'
import ViewEmployeeByOwner from '../../Pages/ViewEmployee/ViewEmployeeByOwner'
import ViewManagerByOwner from '../../Pages/ViewManager/ViewManagerByOwner'
import AddManager from '../../Pages/AddManager/AddManager'
import AddEmployee from '../../Pages/AddEmployee/AddEmployee'
import AddEmployeeByAdmin from '../../Pages/AddEmployee/AddEmployeeByAdmin'
import Resetpassword from '../../Pages/AdminPassword/Resetpassword'


const Owner = () => {

    
  return (

    <>
    <Header/>
    <div className='owner'>
        <div className="aside">
            <div className="nav">
        
                <div className="view">
                <i className="fa-solid fa-eye"></i>
                    <Link to='viewowner'>VIEW ADMINS</Link>
                </div>
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
                    <Link to='addmanager'>ADD MANAGER</Link>
                </div>

                <div className="view">
                    <i className="fa-solid fa-plus"></i>
                    <Link to='addemployee'>ADD EMPLOYEE</Link>
                </div>
               
            </div>
        </div>
        <div className="main">
        
            <Routes>
                <Route path='viewowner' element={<ViewOwner/>} />
                <Route path='viewmanager' element={ <ViewManagerByOwner/> } />
                <Route path='viewemployee' element={ <ViewEmployeeByOwner/> } />
                <Route path='addmanager' element={ <AddManager/> } />
                <Route path='addemployee' element={ <AddEmployeeByAdmin/> } />
                <Route path='resetpassword' element={ <Resetpassword/> } />
            </Routes>
        </div>
    </div>
    
    </>
  )
}

export default Owner
