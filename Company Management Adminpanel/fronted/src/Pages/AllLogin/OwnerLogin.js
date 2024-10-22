import React, { useState } from 'react'
import './OwnerLogin.css'
import {useDispatch, useSelector} from 'react-redux'
import { addOwner, loginOwner } from '../../Redux/ownerSlice'
import { useNavigate } from 'react-router-dom'

const OwnerLogin = () => {

  const [login, setLogin] = useState(false)
  const {loading, error} = useSelector((state)=> state.owner)
  const [admin, setAdmin] = useState([])
  const [owner, setOwner] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    image: "",
  });
  

  const dispatch = useDispatch()
  const navigate = useNavigate()


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

  const handleAdminChange = (e)=> {
    const {name, value, files} = e.target
    if(name === 'image'){
      setOwner((prevstate)=>({
        ...prevstate,
        [name]: files[0]
      }))
    }else{
      setOwner((prevstate)=>({
        ...prevstate,
        [name]: value
      }))
    }
  }

  const HandleSubmit = async (e)=> {
    e.preventDefault()
    try {

        const result = await dispatch(loginOwner(admin)).unwrap()     
        if(result){
          navigate('/owner')
        }

    } catch (error) {
      console.log('Login failed', error)
    }
  }

  const HandleCreateAdmin = (e)=> {
    e.preventDefault()
    dispatch(addOwner(owner))
    navigate('/owner')
  }

  return (
    <div className='login'>

      {login == false ? (

        <form className='login-form' onSubmit={HandleSubmit}>
        <h3 className='login-title'>Admin Login</h3>
        <input type="email" name='email' placeholder='Enter admin email ID' onChange={handleChange} />
        <input type="password" name='password' placeholder='Enter admin password' onChange={handleChange} />
        <button type='submit'>Login</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      ): (

        <form className='login-form' onSubmit={HandleCreateAdmin}>
        <h3 className='login-title'>Create Admin Account</h3>
          <input type="text" name='name' placeholder='Enter admin name' value={owner.name} onChange={handleAdminChange} />
          <input type="email" name='email' placeholder='Enter admin email ID' value={owner.email} onChange={handleAdminChange} />
          <input type="number" name='phone' placeholder='Enter owner phone no.' value={owner.phone} onChange={handleAdminChange} />
          <input type="password" name='password' placeholder='Enter admin password' value={owner.password} onChange={handleAdminChange} />
          <input type="file" className='file' name='image' placeholder='Enter owner image' onChange={handleAdminChange} />
          <button type='submit'>Login</button>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        
      )}

      {login == false && <p>Create a new account? <span onClick={()=>setLogin(true)} style={{color: 'tomato'}}>Click here</span></p>}
      {login == true && <p>Already have an account? <span onClick={()=>setLogin(false)} style={{color: 'tomato'}}>Login here</span></p>}
    
    </div>
  )
}

export default OwnerLogin
