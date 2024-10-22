import React, { useState } from 'react'
import './AddEmployee.css'
import { addEmployees } from '../../Redux/employeeSlice';
import { useDispatch, useSelector } from 'react-redux'

const AddEmployee = () => {

    const [employee, setEmployee] = useState({
      name: '',
      email: '',
      phone: '',
      password: '',
      image: '',
    })

    const dispatch = useDispatch()

    const {loading, error} = useSelector((state)=> state.employee)
    

    const HandleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === "image") {
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
     
        e.preventDefault();
        dispatch(addEmployees(employee))
    };



  return (
    <div className="add">

      <form action="" className='add-form' onSubmit={HandleSubmit}>
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

        {loading && <p>Loading...</p> }
        {error && <p>{error}</p>}

      </form>

    </div>
  )
}

export default AddEmployee
