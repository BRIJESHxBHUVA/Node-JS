import React, { useState } from "react";
import "../AllLogin/OwnerLogin.css";
import { forgotAdminPassword, sendOTP } from "../../Redux/ownerSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Forgotpassword = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [forgotPassword, setForgotPassword] = useState({
        otp: "",
        newps: "",
        confirmps: "",
      });
    const [form, setForm] = useState(false)
    
    
      const dispatch = useDispatch();
      const { loading, error } = useSelector((state) => state.owner);
    
      const HandleChange = (e) => {
        const { name, value } = e.target;
        setForgotPassword((prevstate) => ({
          ...prevstate,
          [name]: value,
        }));
      };

      const HandleEmailChange = (e)=> {
        const {name, value} = e.target
        setEmail((prevstate)=>({
            ...prevstate,
            [name]: value
        }))
      }
    
      const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
         const success = await dispatch(forgotAdminPassword(forgotPassword)).unwrap()
         if(success){
          setTimeout(()=>{
            navigate('/')
          },1500)
         }
          
        } catch (error) {
          console.log(error)
        }
        console.log(forgotPassword)
      };

      const HandleEmailSubmit = async (e)=> {
        e.preventDefault()
        try {
            const sendotp = await dispatch(sendOTP(email)).unwrap()
            if(sendotp){
             setForm(true)
            }
        } catch (error) {
            console.log(error)
        }
      }
    
      return (
        <div className="login">

          {!loading ? (

         !form ? (

            <form className="login-form" onSubmit={HandleEmailSubmit}>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter email ID"
              onChange={HandleEmailChange}
        
            />
            <button type="submit">Send OTP</button>
        
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>

         ) : (

            <form className="login-form" onSubmit={HandleSubmit}>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              required
              value={forgotPassword.otp}
              onChange={HandleChange}
            />
            <input
              type="password"
              name="newps"
              placeholder="Enter New Password"
              required
              value={forgotPassword.newps}
              onChange={HandleChange}
            />
            <input
              type="text"
              name="confirmps"
              placeholder="Enter Confirm Password"
              required
              value={forgotPassword.confirmps}
              onChange={HandleChange}
            />
            <button type="submit">Change Password</button>
            
          </form>

         )   
            
          ) : (
            <Loading />
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
      );
}

export default Forgotpassword
