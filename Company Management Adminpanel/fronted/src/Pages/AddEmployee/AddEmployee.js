import React, { useState } from 'react'
import './AddEmployee.css'
import { addEmployee } from '../../Redux/managerSlice';
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../Components/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const AddEmployee = () => {

    const [employee, setEmployee] = useState({
      name: '',
      email: '',
      phone: '',
      password: '',
      image: '',
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {loading, error} = useSelector((state)=> state.manager)
    

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
        try {
          const success = await dispatch(addEmployee(employee)).unwrap()
          if(success){
            
            setEmployee({
              name: '',
              email: '',
              phone: '',
              password: '',
              image: '',
            })
          }
        } catch (error) {
          console.log(error, 'Employee Register Error')
        }
       
    };



  return (
    <div className="add">
      {!loading ? (

      <form action="" className='add-form' onSubmit={HandleSubmit}>
        <div className="box">
          <label htmlFor="">Employee Full Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={HandleChange}
            required
          />
        </div>
        <div className="box">
          <label htmlFor="">Employee Email</label>
          <input
            type="text"
            name="email"
            value={employee.email}
            onChange={HandleChange}
            required
          />
        </div>
        <div className="box">
          <label htmlFor="">Employee Contact No.</label>
          <input
            type="text"
            name="phone"
            value={employee.phone}
            onChange={HandleChange}
            required
          />
        </div>
        <div className="box">
          <label htmlFor="">Select Password</label>
          <input
            type="text"
            name="password"
            value={employee.password}
            onChange={HandleChange}
            required
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

export default AddEmployee
