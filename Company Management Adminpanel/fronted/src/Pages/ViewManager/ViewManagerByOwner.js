import React, {useEffect} from 'react'
import './ViewManager.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchManagers } from '../../Redux/ownerSlice'
import { deleteManager } from '../../Redux/ownerSlice'
import Loading from '../../Components/Loading/Loading'

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
              <td onClick={()=>{removeManager(el._id)}}>Delete</td>
            </tr>
          ))}
          {error && <tr><td colSpan='4'>{error}</td></tr>}
        </tbody>
    </table>

    ) : (
      <Loading/>
    )}
</div>
  )
}

export default ViewManagerByOwner
