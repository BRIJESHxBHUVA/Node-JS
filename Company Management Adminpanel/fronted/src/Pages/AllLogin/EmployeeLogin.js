import React, {useState} from 'react'
import './EmployeeLogin.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginEmployee } from '../../Redux/employeeSlice'
import { useNavigate } from 'react-router-dom'

const EmployeeLogin = () => {

  const [loginEmployees, setLoginEmployees] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  
  const {loading, error} = useSelector((state)=> state.employee)

  const handleChange = (e) => {
    const {name, value} = e.target 
    setLoginEmployees((prevstate)=> ({
      ...prevstate,
      [name]: value
    }))
  }

  const HandleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await dispatch(loginEmployee(loginEmployees)).unwrap()  
      if(result){
        navigate('/employee')
      }     
    } catch (error) {
      console.log('Login Error', error)
    }
  }

  return (
    <div className='login'>
      <h3 className='login-title'>Employee Login</h3>
      <form className='login-form' onSubmit={HandleSubmit} >
        <input type="email" placeholder='Enter employee email ID' name='email' onChange={handleChange} />
        <input type="password" placeholder='Enter employee password' name='password' onChange={handleChange} />
        <button type='submit'>Login</button>
      </form>
      {loading && <p>Loading....</p>}
      {error && <p>{error}</p>}
    </div>
  )
}

export default EmployeeLogin
