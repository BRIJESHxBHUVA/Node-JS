import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => {
    return(
        sessionStorage.getItem('employeeToken')
    )
}

export const fetchEmployees = createAsyncThunk('employee/fetchEmployees', async (_, {rejectWithValue})=> {
    try {
        const token = getToken()
        const response = await axios.get('http://localhost:1800/company/employee/getemployee', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response)
       
        return response.data.data
    } catch (error) {
       return rejectWithValue(error.response.data.message || 'Something went wrong')
    }
})

export const addEmployees = createAsyncThunk('employee/addEmployees', async (newEmployee, {rejectWithValue})=> {
    try {
        const response = await axios.post('http://localhost:1800/company/employee/addemployee', newEmployee, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(response)
        return response.data

    } catch (error) {
        console.log(error.response.data.message)
       return rejectWithValue(error.response.data.message || 'Something went wrong')
    }
})

export const loginEmployee = createAsyncThunk('employee/loginEmployee', async(employee, {rejectWithValue})=> {
    try {
        const response = await axios.post('http://localhost:1800/company/employee/login', employee)
        console.log(response)
        const token = response.data.token 
        sessionStorage.setItem('employeeToken', token)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

const initialState = {
    employees: [],
    loading: false,
    error: null,
}

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {

        //For Fetch Employees Data

        builder.addCase(fetchEmployees.pending, (state)=> {
            state.loading = true
        })

        builder.addCase(fetchEmployees.fulfilled, (state, action)=> {
            state.loading = false
            state.employees = action.payload
        })

        builder.addCase(fetchEmployees.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })

        // For Post New Employee Data 

        builder.addCase(addEmployees.pending, (state)=> {
            state.loading = true
        })

        builder.addCase(addEmployees.fulfilled, (state, action)=> {
            state.loading = false
            state.employees.push(action.payload)
        })

        builder.addCase(addEmployees.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })

        // For Login Employee

        builder.addCase(loginEmployee.pending, (state)=> {
            state.loading = true
        })

        builder.addCase(loginEmployee.fulfilled, (state, action)=> {
            state.loading = false
            state.employees.push(action.payload)
        })

        builder.addCase(loginEmployee.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default employeeSlice.reducer;