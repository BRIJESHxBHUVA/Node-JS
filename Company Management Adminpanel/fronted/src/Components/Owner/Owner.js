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


const Owner = () => {

    
  return (

    <>
    <Header/>
    <div className='owner'>
        <div className="aside">
            <div className="nav">
        
                <div className="view">
                    <i className="fa-solid fa-plus"></i>
                    <a href=""><Link to='viewowner'>VIEW ADMINS</Link></a>
                </div>
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
                    <a href=""><Link to='addowner'>ADD ADMIN</Link></a>
                </div>
                
                <div className="view">
                    <i className="fa-solid fa-trash"></i>
                    <a href="">DELETE ADMIN</a>
                </div>
                <div className="view">
                    <i className="fa-solid fa-eye"></i>
                    <a href=""><Link>RESET PASSWORD</Link></a>
                </div>
               
            </div>
        </div>
        <div className="main">
        
            <Routes>
                <Route path='viewowner' element={<ViewOwner/>} />
                <Route path='viewmanager' element={ <ViewManagerByOwner/> } />
                <Route path='viewemployee' element={ <ViewEmployeeByOwner/> } />
                <Route path='addowner' element={ <AddOwner/> } />
            </Routes>
        </div>
    </div>
    
    </>
  )
}

export default Owner
