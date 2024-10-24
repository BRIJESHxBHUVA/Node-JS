import React, { useState } from "react";
import "../AddOwner/AddOwner.css";
import { resetPassword } from "../../Redux/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from 'react-router-dom'
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
        navigate('/viewemployee')
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
          value={employeePassword.oldps}
          onChange={HandleChange}
        />
      </div>
      <div className="box">
        <label htmlFor="">New Password</label>
        <input
          type="text"
          name="newps"
          value={employeePassword.newps}
          onChange={HandleChange}
        />
      </div>
      <div className="box">
        <label htmlFor="">Confirm Password</label>
        <input
          type="text"
          name="confirmps"
          value={employeePassword.confirmps}
          onChange={HandleChange}
        />
      </div>
     
      <button type="submit">Change Password</button>
    {error && <p>{error}</p>}
    </form>

    ) : (
    <Loading/>
    )}

  </div>

  )
}

export default Resetpassword
