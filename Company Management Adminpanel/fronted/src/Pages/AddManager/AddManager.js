import React, { useState } from 'react'
import './AddManager.css'
import { addManager } from '../../Redux/ownerSlice';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const {error, loading} = useSelector((state)=> state.owner)

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
        try {
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
        } catch (error) {
          console.log(error, "Add Manager Error")
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
            required
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Manager Email</label>
          <input
            type="text"
            name="email"
            value={manager.email}
            required
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Manager Contact No.</label>
          <input
            type="text"
            name="phone"
            value={manager.phone}
            required
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Select Password</label>
          <input
            type="text"
            name="password"
            value={manager.password}
            required
            onChange={HandleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="">Select Image</label>
          <input type="file" required name="image" onChange={HandleChange} />
        </div>
        <button type="submit">Submit</button>
        
      </form>


      ) : (
        <Loading/>
      )}
       <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: "300px", whiteSpace: "nowrap" }}
       />
    </div>
  )
}

export default AddManager
