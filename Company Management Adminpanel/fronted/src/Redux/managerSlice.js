import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getToken = () => {
    return(
        sessionStorage.getItem('managerToken')
    )
}

axios.defaults.withCredentials = true;

export const fetchManagers = createAsyncThunk('manager/fetchManagers', async(_, {rejectWithValue})=>{
    try {
        const token = getToken()

        const response = await axios.get('http://localhost:1800/company/manager/getmanager', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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

        toast.success(response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })

        return response.data.data
    } catch (error) {

        toast.error(error.response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })

        
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

        toast.success(response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })

        return response.data

    } catch (error) {

        toast.error(error.response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })


        return rejectWithValue(error.response.data.message)
    }
})

export const loginManager = createAsyncThunk('manager/loginManager', async(manager, {rejectWithValue})=>{
    try {
        const response = await axios.post('http://localhost:1800/company/manager/login', manager)
        const token = response.data.token
        const managerId = response.data.user._id
        const Manager = response.data.user
        sessionStorage.setItem('managerToken', token)
        sessionStorage.setItem('managerId', managerId)
        sessionStorage.setItem('Manager', JSON.stringify(Manager))
        return response.data
    } catch (error) {

        toast.error(error.response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })


       return rejectWithValue(error.response.data.message || 'Something went wrong')
    }
})


export const resetPassword = createAsyncThunk('manager/resetPassword', async (password, {rejectWithValue})=> {
    try {
        const token = getToken()
        const managerID = sessionStorage.getItem('managerId')
        const response = await axios.put(`http://localhost:1800/company/manager/resetpassword?id=${managerID}`, password)

        toast.success(response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })

        return response.data
    } catch (error) {

        toast.error(error.response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })


       return rejectWithValue(error.response.data.message)
    }
})

export const sendOTP = createAsyncThunk('manager/sendOTP', async (otp, {rejectWithValue})=> {
    try {
        const response = await axios.post('http://localhost:1800/company/manager/sendotp', otp)
        console.log(response.data)
        const managerID = response.data.useremail._id
        console.log(managerID)
        sessionStorage.setItem('ManagerForgotPasswordId', managerID)

        toast.success(response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })

        return response.data
    } catch (error) {

        toast.error(error.response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })


       return rejectWithValue(error.response.data.message)
    }
})

export const forgotManagerPassword = createAsyncThunk('manager/forgotManagerPassword', async (newPassword, {rejectWithValue})=> {
    try {
        const managerID = sessionStorage.getItem('ManagerForgotPasswordId')
        const response = await axios.put(`http://localhost:1800/company/manager/forgotpassword?id=${managerID}`, newPassword)

        toast.success(response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })

        return response.data
    } catch (error) {

        toast.error(error.response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })

        return rejectWithValue(error.response.data.message)
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


        // For Send OTP to Manager

        builder.addCase(sendOTP.pending, (state)=> {
            state.loading = true
        })

        builder.addCase(sendOTP.fulfilled, (state, action)=> {
            state.loading = false
            state.managers.push(action.payload)
        })

        builder.addCase(sendOTP.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })
    }
})


export default managerSlice.reducer