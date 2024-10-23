import React,{useState} from 'react'
import './ManagerLogin.css'
import { loginManager } from '../../Redux/managerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from '../../Components/Loading/Loading'

const ManagerLogin = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [managerLogin, setManagerLogin] = useState([])

  const {loading, error} = useSelector((state)=> state.manager)

  const handleChange = (e)=> {
    const {value, name} = e.target 
    setManagerLogin((prevstate)=> ({
      ...prevstate,
      [name]: value
    }))
  }

  const HandleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const result = await dispatch(loginManager(managerLogin)).unwrap()
      if(result){
        navigate('/manager')
      }
    } catch (error) {
      console.log('Login Error', error)
    }
  }

  return (
    <div className='login'>

      <h3 className='login-title'>Manager Login</h3>
      <form className='login-form' onSubmit={HandleSubmit}>
        <input type="email" name='email' placeholder='Enter manager email ID' onChange={handleChange} />
        <input type="password" name='password' placeholder='Enter manager password' onChange={handleChange} />
        <button type='submit'>Login</button>
      </form>
      {loading && <Loading/>}
      {error && <p>{error}</p>}
    </div>
  )
}

export default ManagerLogin
