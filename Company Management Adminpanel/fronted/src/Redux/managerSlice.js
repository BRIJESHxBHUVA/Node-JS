import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => {
    return(
        sessionStorage.getItem('managerToken')
    )
}

export const fetchManagers = createAsyncThunk('manager/fetchManagers', async(_, {rejectWithValue})=>{
    try {
        const token = getToken()

        const response = await axios.get('http://localhost:1800/company/manager/getmanager', {
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

export const fetchEmployees = createAsyncThunk('manager/fetchEmployees', async (_, {rejectWithValue})=> {
    try {
        const token = getToken()
        const response = await axios.get('http://localhost:1800/company/manager/getemployee', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response)
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const addEmployee = createAsyncThunk('manager/addManagers', async (newEmployee, {rejectWithValue})=> {
    try {
        const token = getToken()

        const response = await axios.post('http://localhost:1800/company/manager/addemployee', newEmployee, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response)
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Something went wrong')
    }
})

export const deleteEmployee = createAsyncThunk('manager/deleteEmployee', async (employeeID, {rejectWithValue})=> {
    try {

        const token = getToken()

        const response = await axios.delete(`http://localhost:1800/company/manager/deleteemployee?id=${employeeID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response)
        return response.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const loginManager = createAsyncThunk('manager/loginManager', async(manager, {rejectWithValue})=>{
    try {
        const response = await axios.post('http://localhost:1800/company/manager/login', manager)
        console.log(response)
        const token = response.data.token
        const managerId = response.data.user._id
        sessionStorage.setItem('managerToken', token)
        sessionStorage.setItem('managerId', managerId)
        return response.data
    } catch (error) {
       return rejectWithValue(error.response.data.message || 'Something went wrong')
    }
})


export const resetPassword = createAsyncThunk('manager/resetPassword', async (password, {rejectWithValue})=> {
    try {
        const token = getToken()
        const managerID = sessionStorage.getItem('managerId')
        const response = await axios.put(`http://localhost:1800/company/manager/forgotpassword?id=${managerID}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        rejectWithValue(error.response.data.message)
    }
})

const initialState = {
    managers: [],
    employees: [],
    loading: false,
    error: null,
}

const managerSlice = createSlice({
    name: 'manager',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {

        // For Fetching Manager Data

        builder.addCase(fetchManagers.pending, (state)=>{
            state.loading = true
        })

        builder.addCase(fetchManagers.fulfilled, (state, action)=>{
            state.loading = false
            state.managers = action.payload
        })

        builder.addCase(fetchManagers.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })


        // For Fetch Employee Data

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

        builder.addCase(addEmployee.pending, (state)=> {
            state.loading = true
        })

        builder.addCase(addEmployee.fulfilled, (state, action)=> {
            state.loading = false
            state.employees.push(action.payload)
        })

        builder.addCase(addEmployee.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })


        // For Delete Employee


        builder.addCase(deleteEmployee.pending, (state)=> {
            state.loading = true
        })

        builder.addCase(deleteEmployee.fulfilled, (state, action)=> {
            state.loading = false
        })

        builder.addCase(deleteEmployee.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })

        // For Manager Login

        builder.addCase(loginManager.pending, (state)=> {
            state.loading = true
        })

        builder.addCase(loginManager.fulfilled, (state, action)=> {
            state.loading = false
            state.managers.push(action.payload)
        })

        builder.addCase(loginManager.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })


        // For Reset Manager Password

        builder.addCase(resetPassword.pending, (state)=> {
            state.loading = true
        })

        builder.addCase(resetPassword.fulfilled, (state, action)=> {
            state.loading = false
        })

        builder.addCase(resetPassword.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })
    }
})


export default managerSlice.reducer