import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

    const [dp, setDp] = useState('')
    const [managerDP, setManagerDP] = useState('')
    const [employeeDP, setEmployeeDP] = useState('')
    const [name, setName] = useState('')
    const [managerName, setManagerName] = useState('')
    const [employeeName, setEmployeeName] = useState('')
    const [user, setUser] = useState([])
    const [viewUser, setViewUser] = useState(false)
    const [menubar, setMenubar] = useState(false)
    const [manager, setManager] = useState(false)
    const [employee, setEmployee] = useState(false)
    const [admin, setAdmin] = useState(false)

    const navigate = useNavigate()
    
    useEffect(()=>{

      const adminData = sessionStorage.getItem('Admin')
      const managerData = sessionStorage.getItem('Manager')
      const employeeData = sessionStorage.getItem('Employee')
      if(adminData){
        try {

          const admin = JSON.parse(adminData)
          setUser(admin)
          setDp(admin.image)
          setName(admin.email) 
          console.log(admin)
          setAdmin(true)
          setManager(false)
          setEmployee(false)
          
        } catch (error) {
          console.error("Error parsing admin data: ", error)
        }
      }
      else if(managerData){
        try {
            const manager = JSON.parse(managerData)
            setManagerDP(manager.image)
            setManagerName(manager.name)
            setUser(manager)
            setManager(true)
            setAdmin(false)
            setEmployee(false)
            console.log(manager)
            console.log(managerDP)
            console.log(managerName)
        } catch (error) {
          console.error("Error parsing manager data: ", error)
        }
      }else{
        try {
          const employee = JSON.parse(employeeData)
          setEmployeeDP(employee.image)
          setEmployeeName(employee.name)
          setUser(employee)
          setEmployee(true)
          setAdmin(false)
          setManager(false)
          console.log(employee)
          console.log(employeeDP)
          console.log(employeeName)
        } catch (error) {
          console.error("Error parsing employee data: ", error)
        }
      }
      
    },[])

    const HandleLogout = ()=> {
      sessionStorage.removeItem('Admin')
      setUser([])
      setDp('')
      setName('')
      navigate('/')
    }

    const HandleManagerLogout = ()=> {
      sessionStorage.removeItem('Manager')
      setUser([])
      setManagerDP('')
      setManagerName('')
      navigate('/managerlogin')
    }

    const HandleEmployeeLogout = ()=> {
      sessionStorage.removeItem('Employee')
      setUser([])
      setEmployeeDP('')
      setEmployeeName('')
      navigate('/employeelogin')
    }

  return (
    <>
      <div className="sidebar" style={{display: `${menubar === false ? 'none' : 'flex'}`, right: `${menubar === false ? '100%' : '0%'}`}}>
           <div className="sidebar-close" onClick={()=>{setMenubar(false)}}>
              <i className="fa-solid fa-xmark"></i>
            </div>

            <div className="menubar" style={{display: `${admin === false ? 'none' : 'flex'}`}}>
              <div className="menu-opt">
                <span><Link to='viewowner' className="menu-link" onClick={()=>{setMenubar(false)}}>View Admin</Link></span>
              </div>
              <div className="menu-opt">
                <span><Link to='viewmanager' className="menu-link" onClick={()=>{setMenubar(false)}}>View Manager</Link></span>
              </div>
              <div className="menu-opt">
                <span><Link to='viewemployee' className="menu-link" onClick={()=>{setMenubar(false)}}>View Employee</Link></span>
              </div>
              <div className="menu-opt">
                <span><Link to='addmanager' className="menu-link" onClick={()=>{setMenubar(false)}}>Add Manager</Link></span>
              </div>
              <div className="menu-opt">
                <span><Link to='addemployee' className="menu-link" onClick={()=>{setMenubar(false)}}>Add Employee</Link></span>
              </div>
            </div>

            {/* For Manager Menubar  */}

            <div className="menubar" style={{display: `${manager === false ? 'none' : 'flex'}`}}>
             
              <div className="menu-opt">
                <span><Link to='viewmanager' className="menu-link" onClick={()=>{setMenubar(false)}}>View Manager</Link></span>
              </div>
              <div className="menu-opt">
                <span><Link to='viewemployee' className="menu-link" onClick={()=>{setMenubar(false)}}>View Employee</Link></span>
              </div>
              <div className="menu-opt">
                <span><Link to='addemployee' className="menu-link" onClick={()=>{setMenubar(false)}}>Add Employee</Link></span>
              </div>
            </div>


            {/* For Employee Menubar */}


            <div className="menubar" style={{display: `${employee === false ? 'none' : 'flex'}`}}>
             
              <div className="menu-opt">
                <span><Link to='viewemployee' className="menu-link" onClick={()=>{setMenubar(false)}}>View Employee</Link></span>
              </div>
      
            </div>



      </div>
      <div className="header">
        <div className="option">
          <span><Link to='/owner' style={{textDecoration: 'none'}} className="Link">Admin</Link></span>
        </div>
        <div className="option">
          <span><Link to='/manager' style={{textDecoration: 'none'}} className="Link">Manager</Link></span>
        </div>
        <div className="option">
          <span><Link to='/employee' style={{textDecoration: 'none'}} className="Link">Employee</Link></span>
        </div>
        <div className="option" onClick={()=>{setMenubar(true)}}>
          <i class="fa-solid fa-bars"></i>
        </div>
      </div>

      <div className="userprofile" style={{display: `${viewUser === false ? 'none' : 'grid'}`}}>
          <div className="user">
            <div className="close" onClick={()=>{setViewUser(false)}}>
            <i className="fa-solid fa-xmark"></i>
            </div>

            <div className="edit bg-primary">
            <i class="fa-solid fa-pen-to-square"></i>
            </div>

            <div className="userhead">
              <div className="userdp">
               {admin && <img src={`http://localhost:1800/Images/owner/${dp}`} alt="" />}
               {manager && <img src={`http://localhost:1800/Images/manager/${managerDP}`} alt="" />}
               {employee && <img src={`http://localhost:1800/Images/employee/${employeeDP}`} alt="" />}
              </div>
              <div className="userid">
                {admin && <p className="username">{user.name}</p>}
                {manager && <p className="username">{managerName.name}</p>}
                {employee && <p className="username">{employeeName.name}</p>}
                <p className="userpost">Admin</p>
              </div>
            </div>
            <div className="userbody">
                <p>email : <span>{user.email}</span></p>
                <p>phone : <span>{user.phone}</span></p>
                <p>Created At : <span>{user.createdAT}</span></p>
            </div>
            <div className="userfooter">
                <button className="btn btn-danger">Reset Password</button>
                { admin && <button className="btn btn-dark" onClick={()=>HandleLogout()}>A Log out</button>}
                { manager && <button className="btn btn-dark" onClick={()=>HandleManagerLogout()}>M Log out</button>}
                { employee && <button className="btn btn-dark" onClick={()=>HandleEmployeeLogout()}>E Log out</button>}
            </div>
          </div>
       </div>


      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Company AdminPanel
          </a>

          <button
            className="navbar-toggler btn btn-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
         
          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav mb-lg-0 ">
              <li className="nav-item">
              
                <Link className="nav-link" aria-current="page" to="/owner">
               
                  ADMIN
                  
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/manager">
                  MANAGER
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employee">
                  EMPLOYEE
                </Link>
              </li>
            </ul>
          </div>

          <div className="profile" onClick={()=>{setViewUser(true)}}>
            <div className="dp">
               {admin && <img src={`http://localhost:1800/Images/owner/${dp}`} alt="" />}
               {manager && <img src={`http://localhost:1800/Images/manager/${managerDP}`} alt="" />}
               {employee && <img src={`http://localhost:1800/Images/employee/${employeeDP}`} alt="" />}
            </div>
            <div className="name">
              <p className="p">{name}</p>
            </div>
          </div>
        </div>
      </nav>

    

    </>
  );
};

export default Header;
