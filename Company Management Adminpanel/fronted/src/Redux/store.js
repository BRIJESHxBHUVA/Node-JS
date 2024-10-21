import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from '../Redux/employeeSlice'
import managerSlice from '../Redux/managerSlice'
import ownerSlice from '../Redux/ownerSlice'

const store = configureStore({
    reducer: {
        employee: employeeSlice,
        manager: managerSlice,
        owner: ownerSlice
    }
})

export default store