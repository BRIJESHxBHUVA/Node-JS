import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    email: '',
    phone: '',
    password: '',
    image: '',
    employees: [],
}

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployeesList: (state, action)=> {
            state.employees = action.payload
        }
    }
})

export const {setEmployee, setEmployeesList} = employeeSlice.actions;
export default employeeSlice.reducer;