import React, { useState } from 'react'
import './AddEmployee.css'
import { addEmployee } from '../../Redux/managerSlice';
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../Components/Loading/Loading';


const AddEmployee = () => {

    const [employee, setEmployee] = useState({
      name: '',
      email: '',
      phone: '',
      password: '',
      image: '',
    })

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
        dispatch(addEmployee(employee))
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

export default AddEmployee
