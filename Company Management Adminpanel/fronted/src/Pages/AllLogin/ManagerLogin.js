import React,{useState} from 'react'
import './ManagerLogin.css'
import { loginManager } from '../../Redux/managerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../Components/Loading/Loading'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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
        navigate('/manager/viewmanager')
      }
    } catch (error) {
      console.log('Login Error', error)
    }
  }

  return (
    <div className='login'>
    {!loading ? (
     
      <form className='login-form' onSubmit={HandleSubmit}>
      <h3 className='login-title mb-4'>Manager Login</h3>
        <input type="email" name='email' placeholder='Enter manager email ID' required onChange={handleChange} />
        <input type="password" name='password' placeholder='Enter manager password' required onChange={handleChange} />
        <button type='submit'>Login</button>
        <p>Forgot Password ? <Link to='/forgotmngpassword' style={{textDecoration: 'none'}}><span style={{color: 'tomato'}}>Click here</span></Link></p>
  
      </form>

    ) : (
      <Loading/>
    )}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: "300px", whiteSpace: "nowrap" }} 
       />

    </div>
  )
}

export default ManagerLogin
