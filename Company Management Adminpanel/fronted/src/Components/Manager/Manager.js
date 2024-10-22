import React from 'react'
import './Manager.css'
import { Link, Route, Routes } from 'react-router-dom'
import ViewManager from '../../Pages/ViewManager/ViewManager'
import AddManager from '../../Pages/AddManager/AddManager'
import Header from '../Header/Header'
import ViewEmployeeByManager from '../../Pages/ViewEmployee/ViewEmployeeByManager'

const Manager = () => {
  return (

    <>
    
    <Header/>
    <div className='owner'>
        <div className="aside">
            <div className="nav">
            
                <div className="view">
                    <i className="fa-solid fa-plus"></i>
                    <a href=""><Link to='viewmanager'>VIEW MANAGERS</Link></a>
                </div>

                <div className="view">
                    <i className="fa-solid fa-plus"></i>
                    <a href=""><Link to='viewemployee'>VIEW EMPLOYEES</Link></a>
                </div>

                <div className="view">
                    <i className="fa-solid fa-plus"></i>
                    <a href=""><Link to='addmanager'>ADD MANAGER</Link></a>
                </div>
                <div className="view">
                    <i className="fa-solid fa-trash"></i>
                    <a href=""><Link>DELETE MANAGER</Link></a>
                </div>
                <div className="view">
                    <i className="fa-solid fa-eye"></i>
                    <a href=""><Link>RESET PASSWORD</Link></a>
                </div>
               
            </div>
        </div>
        <div className="main">
            <Routes>
                <Route path='viewmanager' element={ <ViewManager/> } />
                <Route path='viewemployee' element={ <ViewEmployeeByManager/> } />
                <Route path='addmanager' element={ <AddManager/> } />
            </Routes>
        </div>
    </div>

    </>
  )
}

export default Manager
