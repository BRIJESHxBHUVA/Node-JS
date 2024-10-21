import React, { useState } from 'react'
import './AddManager.css'
import axios from 'axios'
import { addManagers } from '../../Redux/managerSlice';
import {useDispatch, useSelector} from 'react-redux'

const AddManager = () => {

  const [manager, setManager] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    image: '',
  })

  const dispatch = useDispatch()

    const HandleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === "image") {
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
    
        e.preventDefault();
        dispatch(addManagers(manager))
    };


  return (
    <div className="add">
      <form action="" className='add-form' onSubmit={HandleSubmit}>
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
