import React, { useContext } from 'react'
import './ViewOwner.css'
import { AppContext } from '../../Context'

const ViewOwner = () => {

  const {getemployee} = useContext(AppContext)


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
              {getemployee && getemployee.map((el, i)=> (
                <tr key={i}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.phone}</td>
                  <td>{el.password}</td>
                  {console.log(getemployee.name)}
                </tr>
              ))}
            </tbody>
        </table>
    </div>
  )
}

export default ViewOwner
