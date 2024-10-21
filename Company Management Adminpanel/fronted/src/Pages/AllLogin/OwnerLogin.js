import React, { useState } from 'react'
import './OwnerLogin.css'
import {useDispatch, useSelector} from 'react-redux'
import { loginOwner } from '../../Redux/ownerSlice'


const OwnerLogin = () => {

  const [login, setLogin] = useState(false)
  const {loading, error} = useSelector((state)=> state.owner)
  const [admin, setAdmin] = useState([])

  const dispatch = useDispatch()


  const handleChange = (e) =>{
    const {files, name, value} = e.target
    if(name === 'image'){
      setAdmin((prevstate)=> ({
        ...prevstate,
        [name]: files[0]
      }))
    }else{
      setAdmin((prevstate)=>({
        ...prevstate,
        [name]: value
      }))
    }
  }

  const HandleSubmit = (e)=> {
    e.preventDefault()
    dispatch(loginOwner(admin))
  }

  return (
    <div className='login'>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {login == false ? (

        <form className='login-form' onSubmit={HandleSubmit}>
        <h3 className='login-title'>Admin Login</h3>
        <input type="email" name='email' placeholder='Enter admin email ID' onChange={handleChange} />
        <input type="password" name='password' placeholder='Enter admin password' onChange={handleChange} />
        <button type='submit'>Login</button>
      </form>

      ): (

        <form className='login-form'>
        <h3 className='login-title'>Create Admin Account</h3>
          <input type="text" name='name' placeholder='Enter admin name' />
          <input type="email" name='email' placeholder='Enter admin email ID' />
          <input type="number" name='phone' placeholder='Enter owner phone no.' />
          <input type="password" name='password' placeholder='Enter admin password' />
          <input type="file" className='file' name='image' placeholder='Enter owner image' />
          <button type='submit'>Login</button>
        </form>
      )}

      {login == false && <p>Create a new account? <span onClick={()=>setLogin(true)} style={{color: 'tomato'}}>Click here</span></p>}
      {login == true && <p>Already have an account? <span onClick={()=>setLogin(false)} style={{color: 'tomato'}}>Login here</span></p>}
    
    </div>
  )
}

export default OwnerLogin