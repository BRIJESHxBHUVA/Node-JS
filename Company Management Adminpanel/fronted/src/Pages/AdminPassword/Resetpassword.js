import React, { useState } from "react";
import "../AddOwner/AddOwner.css";
import { addOwner, resetPassword } from "../../Redux/ownerSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from 'react-router-dom'

const Resetpassword = () => {

  const navigate = useNavigate()
  const [ownerPassword, setOwnerPassword] = useState({
    oldps: "",
    newps: "",
    confirmps: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.owner);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setOwnerPassword((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await dispatch(resetPassword(ownerPassword)).unwrap()
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
              value={ownerPassword.oldps}
              onChange={HandleChange}
            />
          </div>
          <div className="box">
            <label htmlFor="">New Password</label>
            <input
              type="text"
              name="newps"
              value={ownerPassword.newps}
              onChange={HandleChange}
            />
          </div>
          <div className="box">
            <label htmlFor="">Confirm Password</label>
            <input
              type="text"
              name="confirmps"
              value={ownerPassword.confirmps}
              onChange={HandleChange}
            />
          </div>
          <button type="submit">Change Password</button>
          {error && <p>{error}</p>}
        </form>
      ) : (
        <Loading />
      )}

    </div>
  );
};

export default Resetpassword;
