import React from 'react'
import '../../Pages/ViewOwner/ViewOwner.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchManagers } from '../../Redux/managerSlice'
import { deleteManager } from '../../Redux/ownerSlice'
import Loading from '../../Components/Loading/Loading'

const ViewManager = () => {

  const dispatch = useDispatch()
  const { managers, loading, error } = useSelector((state)=> state.manager)


  useEffect(() => {
    dispatch(fetchManagers())
  }, [dispatch])


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

        </tr>
        </thead>
        <tbody>
              { managers.map((el, index)=> (
                <tr key={index}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.phone}</td>
                  <td><img src={`http://localhost:1800/images/manager/${el.image}`} height='100' width='100' alt="" /></td>
            
                </tr>
              ))}
              {error && <tr><td colSpan='4'>{error}</td></tr>}
              
            </tbody>
    </table>

    </div>
    ) : (
      <Loading/>
    )}
</div>
  )
}

export default ViewManager
