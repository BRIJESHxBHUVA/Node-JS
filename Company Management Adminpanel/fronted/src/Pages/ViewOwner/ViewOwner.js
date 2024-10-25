import React, {useEffect} from 'react'
import './ViewOwner.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOwners } from '../../Redux/ownerSlice'
import Loading from '../../Components/Loading/Loading'


const ViewOwner = () => {


  const dispatch = useDispatch()

  const {owners, loading, error} = useSelector((state)=> state.owner)

  useEffect(() => {
    dispatch(fetchOwners())
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
            
            <tbody className='table-body'>
              { owners.map((el, index)=> (
                <tr key={index}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.phone}</td>
                  <td><img src={`http://localhost:1800/images/owner/${el.image}`} alt="" height='100' width='100' /></td>
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

export default ViewOwner
