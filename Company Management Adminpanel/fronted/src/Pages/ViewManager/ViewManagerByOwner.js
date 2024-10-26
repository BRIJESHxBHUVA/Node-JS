import React, {useEffect} from 'react'
import '../../Pages/ViewOwner/ViewOwner.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchManagers } from '../../Redux/ownerSlice'
import { deleteManager } from '../../Redux/ownerSlice'
import Loading from '../../Components/Loading/Loading'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ViewManagerByOwner = () => {

    const dispatch = useDispatch()

    const {managers, loading, error} = useSelector((state)=> state.owner)
  
    useEffect(() => {
      dispatch(fetchManagers())
    }, [dispatch])

    const removeManager = (id) => {
      dispatch(deleteManager(id))
    }

  return (

    <div className='viewdata'>
      
    {!loading ? (
      
      <div className="alldata">

    <table>
      <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Image</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
          { managers.map((el, index)=> (
            <tr key={index}>
              <td>{el.name}</td>
              <td>{el.email}</td>
              <td>{el.phone}</td>
              <td><img src={`http://localhost:1800/images/manager/${el.image}`} alt="" height='100' width='100' /></td>
              <td><button className='btn btn-danger' style={{textWrap: 'wrap'}} onClick={()=>{removeManager(el._id)}}>Delete</button></td>
            </tr>
          ))}
          {error && <tr><td colSpan='5'>{error}</td></tr>}
        </tbody>
    </table>
</div>
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

export default ViewManagerByOwner
