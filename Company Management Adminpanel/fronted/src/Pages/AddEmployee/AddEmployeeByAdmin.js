import React, { useState } from 'react'
import './AddEmployee.css'
import { addEmployee } from '../../Redux/ownerSlice';
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../Components/Loading/Loading';
import { useNavigate } from 'react-router-dom';

const AddEmployeeByAdmin = () => {

    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        image: '',
      })

      const navigate = useNavigate()
  
      const dispatch = useDispatch()
  
      const {loading, error} = useSelector((state)=> state.owner)
      
  
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
         const success = await dispatch(addEmployee(employee)).unwrap()
         if(success){
          navigate('/owner/viewemployee')
          setEmployee({
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
      {error && <p>{error}</p>}
    </form>

    ) : (
      <Loading/>
    )}

  </div>
  )
}

export default AddEmployeeByAdmin