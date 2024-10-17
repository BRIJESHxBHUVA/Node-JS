import React, { createContext, useState } from "react";
export const AppContext = createContext()


const Context = ({ children }) => {

  const [owner, setOwner] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    image: '',
  })
  const [manager, setManager] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    image: '',
  })
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    image: '',
  })

  const [getemployee, setGetemployee] = useState(null)

  return (
    <AppContext.Provider value={{owner, setOwner, manager, setManager, employee, setEmployee, getemployee, setGetemployee}}>
        {children}
    </AppContext.Provider>
 )
}
export default Context
