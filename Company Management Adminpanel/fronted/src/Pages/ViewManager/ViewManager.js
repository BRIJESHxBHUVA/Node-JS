import React from 'react'
import './ViewManager.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchManagers } from '../../Redux/managerSlice'

const ViewManager = () => {

  const dispatch = useDispatch()
  const { managers, loading, error } = useSelector((state)=> state.manager)


  useEffect(() => {
    dispatch(fetchManagers())
  }, [dispatch])



  return (
    <div className='viewdata'>
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
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
            </tbody>
    </table>
</div>
  )
}

export default ViewManager
