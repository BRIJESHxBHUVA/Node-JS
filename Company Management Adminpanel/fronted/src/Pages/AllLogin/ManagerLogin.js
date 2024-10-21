import React from 'react'
import './ManagerLogin.css'

const ManagerLogin = () => {
  return (
    <div className='login'>
      <h3 className='login-title'>Manager Login</h3>
      <form className='login-form'>
        <input type="email" placeholder='Enter manager email ID' />
        <input type="password" placeholder='Enter manager password' />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default ManagerLogin
