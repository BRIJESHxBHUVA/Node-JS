import React, { useState } from "react";
import "./AddOwner.css";
import { addOwner } from "../../Redux/ownerSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

const AddOwner = () => {
  const [owner, setOwner] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    image: "",
  });

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.owner);

  const HandleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setOwner((prevstate) => ({
        ...prevstate,
        [name]: files[0],
      }));
    } else {
      setOwner((prevstate) => ({
        ...prevstate,
        [name]: value,
      }));
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await dispatch(addOwner(owner)).unwrap()
      if(success){
       navigate('/')
      }
      
    } catch (error) {
      console.log(error, 'Admin Register Error') 
    }
  };

  return (
    <div className="add">
      {!loading ? (

      <form className="add-form" onSubmit={HandleSubmit}>
        <div className="box">
          <label htmlFor="">Owner Full Name</label>
          <input
            type="text"
            name="name"
            value={owner.name}
            required
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Owner Email</label>
          <input
            type="text"
            name="email"
            value={owner.email}
            required
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Owner Contact No.</label>
          <input
            type="text"
            name="phone"
            value={owner.phone}
            required
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Select Password</label>
          <input
            type="text"
            name="password"
            value={owner.password}
            required
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Select Image</label>
          <input type="file" required name="image" onChange={HandleChange} />
        </div>
        <button type="submit">Submit</button>
        {error && <p>{error}</p>}
      </form>


      ) : (
        <Loading/>
      )}

    </div>
  );
};

export default AddOwner;
