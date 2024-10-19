import React, { useContext, useEffect} from 'react'
import './ViewOwner.css'
import { AppContext } from '../../Context'
import axios from 'axios'

const ViewOwner = () => {

  const {findowner, setFindOwner} = useContext(AppContext)

  const getOwnerData = async () => {
    try {
      const response = await axios.get('http://localhost:1800/company/employee/getemployee')
        .then((res) => {
          setFindOwner(res.data.data)
          console.log(findowner)
        })
    } catch (error) {
      console.log(error)
    }
  
  }

  useEffect(() => {
    getOwnerData()
  }, [])


  return (
    <div className='viewdata'>
        <table>
          <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Password</th>
                <th>Image</th>
            </tr>
            </thead>
            <tbody>
              {findowner && findowner.map((el, i)=> (
                <tr key={i}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.phone}</td>
                  <td>{el.password}</td>
                </tr>
              ))}
            </tbody>
        </table>
    </div>
  )
}

export default ViewOwner
