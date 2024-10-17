import React, { useContext } from "react";
import "./AddOwner.css";
import { AppContext } from "../../Context";
import axios from "axios";

const AddOwner = () => {
  const { owner, setOwner } = useContext(AppContext);

  const HandleChange = (e) => {
    const { name, value, files } = e.target;
    if (name == "image") {
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
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:1800/company/addowner",
        owner,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      console.log(owner);
    } catch (error) {
      console.error("Error uploading owner data:", error);
    }
  };

  return (
    <div className="add">
      <form action="" onSubmit={HandleSubmit}>
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
    </div>
  );
};

export default AddOwner;
