import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from '../Redux/employeeSlice'

const store = configureStore({
    reducer: {
        employee: employeeSlice
    }
})

export default store