import React from 'react'
import './EmployeeLogin.css'

const EmployeeLogin = () => {
  return (
    <div className='login'>
      <h3 className='login-title'>Employee Login</h3>
      <form className='login-form'>
        <input type="email" placeholder='Enter employee email ID' />
        <input type="password" placeholder='Enter employee password' />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default EmployeeLogin
