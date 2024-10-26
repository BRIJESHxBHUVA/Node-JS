import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getToken = () => {
    return(
        sessionStorage.getItem('employeeToken')
    )
}

axios.defaults.withCredentials = true;

export const fetchEmployees = createAsyncThunk('employee/fetchEmployees', async (_, {rejectWithValue})=> {
    try {
        const token = getToken()
        const response = await axios.get('http://localhost:1800/company/employee/getemployee', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
       
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
        return response.data

    } catch (error) {

       return rejectWithValue(error.response.data.message || 'Something went wrong')
    }
})

export const loginEmployee = createAsyncThunk('employee/loginEmployee', async(employee, {rejectWithValue})=> {
    try {
        const response = await axios.post('http://localhost:1800/company/employee/login', employee)
        const token = response.data.token 
        const employeeId = response.data.user._id
        const Employee = response.data.user
        sessionStorage.setItem('employeeId', employeeId)
        sessionStorage.setItem('employeeToken', token)
        sessionStorage.setItem('Employee', JSON.stringify(Employee))
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


export const resetPassword = createAsyncThunk('employee/resetPassword', async (password, {rejectWithValue})=> {
    try {
        const token = getToken()
        const employeeId = sessionStorage.getItem('employeeId')

        const response = await axios.put(`http://localhost:1800/company/employee/resetpassword?id=${employeeId}`, password)


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

export const sendOTP = createAsyncThunk('employee/sendOTP', async (otp, {rejectWithValue})=> {
    try {
        const response = await axios.post('http://localhost:1800/company/employee/sendotp', otp)
        console.log(response.data)
        const employeeID = response.data.useremail._id
        sessionStorage.setItem('EmployeeForgotPasswordId', employeeID)
        console.log(employeeID)

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

export const forgotEmployeePassword = createAsyncThunk('employee/forgotEmployeePassword', async (newPassword, {rejectWithValue})=>{
    try {
        const employeeID = sessionStorage.getItem('EmployeeForgotPasswordId')
        const response = await axios.put(`http://localhost:1800/company/employee/forgotpassword?id=${employeeID}`, newPassword)

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


        // For Reset Employee Password

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


        // For Send OTP to Employee

        builder.addCase(sendOTP.pending, (state)=>{
            state.loading = true
        })

        builder.addCase(sendOTP.fulfilled, (state, action)=>{
            state.loading = false
            state.employees.push(action.payload)
        })

        builder.addCase(sendOTP.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })


        // For Forgot Employee Password

        builder.addCase(forgotEmployeePassword.pending, (state)=> {
            state.loading = true
        })

        builder.addCase(forgotEmployeePassword.fulfilled, (state, action)=> {
            state.loading = false
            state.employees.push(action.payload)
        })

        builder.addCase(forgotEmployeePassword.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default employeeSlice.reducer;