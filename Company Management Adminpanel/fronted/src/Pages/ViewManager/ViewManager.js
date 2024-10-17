import React from 'react'
import './ViewManager.css'
import { useEffect, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../../Context'

const ViewManager = () => {

  const {findmanager, setFindManager} = useContext(AppContext)

  const getManagerData = async () => {
    try {
      const response = await axios.get('http://localhost:1800/company/employee/getemployee')
        .then((res) => {
          setFindManager(res.data.data)
          console.log(findmanager)
        })
    } catch (error) {
      console.log(error)
    }
  
  }

  useEffect(() => {
    getManagerData()
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
              {findmanager && findmanager.map((el, i)=> (
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

export default ViewManager
