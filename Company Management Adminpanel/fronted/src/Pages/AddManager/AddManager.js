import React, { useState } from 'react'
import './AddManager.css'
import { addManager } from '../../Redux/ownerSlice';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';

const AddManager = () => {

  const [manager, setManager] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    image: '',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {error, loading} = useSelector((state)=> state.manager)

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
      const success = await dispatch(addManager(manager)).unwrap()
      if(success){
        setManager({
          name: '',
          email: '',
          phone: '',
          password: '',
          image: '',
        })
      }

    };


  return (
    <div className="add">
      {!loading ? (

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
        {error && <p>{error}</p>}
      </form>


      ) : (
        <Loading/>
      )}
    
    </div>
  )
}

export default AddManager
