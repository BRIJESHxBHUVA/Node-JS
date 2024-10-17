import React, { useContext } from 'react'
import './AddEmployee.css'
import { AppContext } from '../../Context';
import axios from 'axios'

const AddEmployee = () => {

    const { employee, setEmployee } = useContext(AppContext)

    const HandleChange = (e) => {
      const { name, value, files } = e.target;
      if (name == "image") {
        setEmployee((prevstate) => ({
          ...prevstate,
          [name]: files[0],
        }));
      } else {
        setEmployee((prevstate) => ({
          ...prevstate,
          [name]: value,
        }));
      }
    };
  
    const HandleSubmit = async (e) => {
      try {
        e.preventDefault();
        const response = await axios.post(
          "http://localhost:1800/company/employee/addemployee",
          employee,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response:", response.data);
        console.log(employee);
      } catch (error) {
        console.error("Error uploading owner data:", error);
      }
    };



  return (
    <div className="add">
      <form action="" onSubmit={HandleSubmit}>
        <div className="box">
          <label htmlFor="">Employee Full Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Employee Email</label>
          <input
            type="text"
            name="email"
            value={employee.email}
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Employee Contact No.</label>
          <input
            type="text"
            name="phone"
            value={employee.phone}
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Select Password</label>
          <input
            type="text"
            name="password"
            value={employee.password}
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

export default AddEmployee
