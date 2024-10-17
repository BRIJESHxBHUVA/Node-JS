import React, { useContext } from 'react'
import './AddManager.css'
import { AppContext } from '../../Context';
import axios from 'axios'

const AddManager = () => {

    const { manager, setManager } = useContext(AppContext)

    const HandleChange = (e) => {
      const { name, value, files } = e.target;
      if (name == "image") {
        setManager((prevstate) => ({
          ...prevstate,
          [name]: files[0],
        }));
      } else {
        setManager((prevstate) => ({
          ...prevstate,
          [name]: value,
        }));
      }
    };
  
    const HandleSubmit = async (e) => {
      try {
        e.preventDefault();
        const response = await axios.post(
          "http://localhost:1800/company/manager/addmanager",
          manager,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response:", response.data);
        console.log(manager);
      } catch (error) {
        console.error("Error uploading owner data:", error);
      }
    };


  return (
    <div className="add">
      <form action="" onSubmit={HandleSubmit}>
        <div className="box">
          <label htmlFor="">Manager Full Name</label>
          <input
            type="text"
            name="name"
            value={manager.name}
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Manager Email</label>
          <input
            type="text"
            name="email"
            value={manager.email}
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Manager Contact No.</label>
          <input
            type="text"
            name="phone"
            value={manager.phone}
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Select Password</label>
          <input
            type="text"
            name="password"
            value={manager.password}
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
  )
}

export default AddManager
