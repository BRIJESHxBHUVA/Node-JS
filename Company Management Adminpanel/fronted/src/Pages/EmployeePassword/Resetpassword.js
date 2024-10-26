import React, { useState } from "react";
import "../AddOwner/AddOwner.css";
import { resetPassword } from "../../Redux/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Resetpassword = () => {

    const navigate = useNavigate()
    const [employeePassword, setEmployeePassword] = useState({
        oldps: "",
        newps: "",
        confirmps: "",
      });
    
      const dispatch = useDispatch();
      const { loading, error } = useSelector((state) => state.employee);
    
      const HandleChange = (e) => {
        const { name, value } = e.target;
            setEmployeePassword((prevstate) => ({
            ...prevstate,
            [name]: value,
          }));
      };
    
      const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
       const success = await dispatch(resetPassword(employeePassword)).unwrap()
       if(success){
        setTimeout(()=>{
          navigate('/employeelogin')
        },1500)
       }
          
        } catch (error) {
          console.log(error)
        }
      };

  return (

    <div className="add">
    {!loading ? (

    <form className="add-form" onSubmit={HandleSubmit}>

      <div className="box">
        <label htmlFor="">Old Password</label>
        <input
          type="text"
          name="oldps"
          required
          value={employeePassword.oldps}
          onChange={HandleChange}
        />
      </div>
      <div className="box">
        <label htmlFor="">New Password</label>
        <input
          type="text"
          name="newps"
          required
          value={employeePassword.newps}
          onChange={HandleChange}
        />
      </div>
      <div className="box">
        <label htmlFor="">Confirm Password</label>
        <input
          type="text"
          name="confirmps"
          required
          value={employeePassword.confirmps}
          onChange={HandleChange}
        />
      </div>
     
      <button type="submit">Change Password</button>
   
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

export default Resetpassword
