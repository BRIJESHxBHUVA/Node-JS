import React, { useState } from "react";
import "../AddOwner/AddOwner.css";
import { resetPassword } from "../../Redux/managerSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loading";


const Resetpassword = () => {

    const [managerPassword, setManagerPassword] = useState({
        oldps: "",
        newps: "",
        confirmps: "",
      });
    
      const dispatch = useDispatch();
      const { loading, error } = useSelector((state) => state.owner);
    
      const HandleChange = (e) => {
        const { name, value } = e.target;
            setManagerPassword((prevstate) => ({
            ...prevstate,
            [name]: value,
          }));
      };
    
      const HandleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(managerPassword));
        console.log(managerPassword)
        const user = sessionStorage.getItem('managerId')
        console.log(user)
      };


  return (
    <div className="add">
      <form className="add-form" onSubmit={HandleSubmit}>


        <div className="box">
          <label htmlFor="">Old Password</label>
          <input
            type="text"
            name="oldps"
            value={managerPassword.oldps}
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">New Password</label>
          <input
            type="text"
            name="newps"
            value={managerPassword.newps}
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Confirm Password</label>
          <input
            type="text"
            name="confirmps"
            value={managerPassword.confirmps}
            onChange={HandleChange}
          />
        </div>
       
        <button type="submit">Change Password</button>
      </form>

      {loading && <Loading/>}
      {error && <p>{error}</p>}

    </div>
  )
}

export default Resetpassword
