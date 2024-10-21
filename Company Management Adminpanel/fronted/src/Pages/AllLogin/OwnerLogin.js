import React from 'react'
import './OwnerLogin.css'

const OwnerLogin = () => {
  return (
    <div className='login'>
        <form>
          <input type="email" placeholder='Enter owner email ID' />
          <input type="password" placeholder='Enter owner password' />
          <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default OwnerLogin
