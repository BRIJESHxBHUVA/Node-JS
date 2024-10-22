import React, { useState } from "react";
import "./AddOwner.css";
import { addOwner } from "../../Redux/ownerSlice";
import { useDispatch, useSelector } from "react-redux";

const AddOwner = () => {
  const [owner, setOwner] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    image: "",
  });

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

  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(addOwner(owner));
  };

  return (
    <div className="add">
      <form className="add-form" onSubmit={HandleSubmit}>
        <div className="box">
          <label htmlFor="">Owner Full Name</label>
          <input
            type="text"
            name="name"
            value={owner.name}
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Owner Email</label>
          <input
            type="text"
            name="email"
            value={owner.email}
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Owner Contact No.</label>
          <input
            type="text"
            name="phone"
            value={owner.phone}
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Select Password</label>
          <input
            type="text"
            name="password"
            value={owner.password}
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Select Image</label>
          <input type="file" name="image" onChange={HandleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

    </div>
  );
};

export default AddOwner;
