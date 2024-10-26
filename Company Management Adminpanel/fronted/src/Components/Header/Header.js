import React, { act, useEffect, useState } from "react";
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
    const [activeRole, setActiveRole] = useState("")

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
          setName(admin.name) 
          console.log(admin)
          setActiveRole('admin')
          console.log(activeRole)
          sessionStorage.removeItem('Manager')
          sessionStorage.removeItem('Employee')
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
            setActiveRole('manager')
            console.log(activeRole)
            sessionStorage.removeItem('Admin')
            sessionStorage.removeItem('Employee')
        } catch (error) {
          console.error("Error parsing manager data: ", error)
        }
      }else{
        try {
          const employee = JSON.parse(employeeData)
          setEmployeeDP(employee.image)
          setEmployeeName(employee.name)
          setUser(employee)
          setActiveRole('employee')
          console.log(activeRole)
          sessionStorage.removeItem('Admin')
          sessionStorage.removeItem('Manager')
        } catch (error) {
          console.error("Error parsing employee data: ", error)
        }
      }
      
    },[])

    const HandleLogout = ()=> {
      sessionStorage.removeItem('Admin')
      sessionStorage.removeItem('adminToken')
      setUser([])
      setDp('')
      setName('')
      navigate('/')
    }

    const HandleManagerLogout = ()=> {
      sessionStorage.removeItem('Manager')
      sessionStorage.removeItem('managerToken')
      setUser([])
      setManagerDP('')
      setManagerName('')
      navigate('/managerlogin')
    }

    const HandleEmployeeLogout = ()=> {
      sessionStorage.removeItem('Employee')
      sessionStorage.removeItem('employeeToken')
      setUser([])
      setEmployeeDP('')
      setEmployeeName('')
      navigate('/employeelogin')
    }

    const handleRoleChange = (role)=> {
      setActiveRole(role)
      setMenubar(true)
    }

  return (
    <>
      <div className="sidebar" style={{display: `${menubar === false ? 'none' : 'flex'}`, right: `${menubar === false ? '100%' : '0%'}`}}>
         
           <div className="sidebar-close" onClick={()=>{setMenubar(false)}}>
              <i className="fa-solid fa-xmark"></i>
            </div>

           { activeRole === 'admin' &&  <div className="menubar">
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
            </div>}

            {/* For Manager Menubar  */}

          { activeRole === 'manager' &&  <div className="menubar">
             
              <div className="menu-opt">
                <span><Link to='viewmanager' className="menu-link" onClick={()=>{setMenubar(false)}}>View Manager</Link></span>
              </div>
              <div className="menu-opt">
                <span><Link to='viewemployee' className="menu-link" onClick={()=>{setMenubar(false)}}>View Employee</Link></span>
              </div>
              <div className="menu-opt">
                <span><Link to='addemployee' className="menu-link" onClick={()=>{setMenubar(false)}}>Add Employee</Link></span>
              </div>
            </div>}


            {/* For Employee Menubar */}


           {activeRole === 'employee' && <div className="menubar">
              <div className="menu-opt">
                <span><Link to='viewemployee' className="menu-link" onClick={()=>{setMenubar(false)}}>View Employee</Link></span>
              </div>
      
            </div>}



      </div>
      <div className="header">
        <div className="option" onClick={()=>handleRoleChange('admin')}>
          <span><Link to='/owner' style={{textDecoration: 'none'}} className="Link">Admin</Link></span>
        </div>
        <div className="option" onClick={()=>handleRoleChange('manager')}>
          <span><Link to='/manager' style={{textDecoration: 'none'}} className="Link">Manager</Link></span>
        </div>
        <div className="option" onClick={()=>handleRoleChange('employee')}>
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
               {activeRole === 'admin' && <img src={`http://localhost:1800/Images/owner/${dp}`} alt="" />}
               {activeRole === 'manager' && <img src={`http://localhost:1800/Images/manager/${managerDP}`} alt="" />}
               {activeRole === 'employee' && <img src={`http://localhost:1800/Images/employee/${employeeDP}`} alt="" />}
              </div>
              <div className="userid">
                {activeRole === 'admin' && <p className="username">{name}</p>}
                {activeRole === 'manager' && <p className="username">{managerName}</p>}
                {activeRole === 'employee' && <p className="username">{employeeName}</p>}
                {activeRole === 'admin' && <p className="userpost">Admin</p>}
                {activeRole === 'manager' && <p className="userpost">Manager</p>}
                {activeRole === 'employee' && <p className="userpost">Employee</p>}
              </div>
            </div>
            <div className="userbody">
                <p>email : <span>{user.email}</span></p>
                <p>phone : <span>{user.phone}</span></p>
                <p>Created At : <span>{user.createdAT}</span></p>
            </div>
            <div className="userfooter">
          
                <button className="btn btn-danger" onClick={()=>setViewUser(false)}><Link to='resetpassword' style={{textDecoration: 'none', color: 'white'}}>Reset Password</Link></button>
                { activeRole === 'admin' && <button className="btn btn-dark" onClick={()=>HandleLogout()}>Log out</button>}
                { activeRole === 'manager' && <button className="btn btn-dark" onClick={()=>HandleManagerLogout()}>Log out</button>}
                { activeRole === 'employee' && <button className="btn btn-dark" onClick={()=>HandleEmployeeLogout()}>Log out</button>}
            </div>
          </div>
       </div>


      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" style={{color: 'white'}}>
            <span>
            Company AdminPanel
            </span>
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
              
                <Link className="nav-link" style={{color: 'white'}} aria-current="page" to="/owner">
               
                  ADMIN
                  
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={{color: 'white'}} aria-current="page" to="/manager">
                  MANAGER
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={{color: 'white'}} to="/employee">
                  EMPLOYEE
                </Link>
              </li>
            </ul>
          </div>

          <div className="profile" onClick={()=>{setViewUser(true)}}>
            <div className="dp">
               {dp && <img src={`http://localhost:1800/Images/owner/${dp}`} alt="" />}
               {managerDP && <img src={`http://localhost:1800/Images/manager/${managerDP}`} alt="" />}
               {employeeDP && <img src={`http://localhost:1800/Images/employee/${employeeDP}`} alt="" />}
            </div>
            <div className="name">
             {name && <p className="p">{name}</p>}
             {managerName && <p className="p">{managerName}</p>}
             {employeeName && <p className="p">{employeeName}</p>}
            </div>
          </div>
        </div>
      </nav>

    

    </>
  );
};

export default Header;
