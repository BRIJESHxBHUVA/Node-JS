import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = ()=> {
    return(
        sessionStorage.getItem('adminToken')
    )
}

axios.defaults.withCredentials = true

export const fetchOwners = createAsyncThunk('owner/fetchOwners', async(_, {rejectWithValue})=> {

    try {

        const token = getToken()

        const response = await axios.get('http://localhost:1800/company/owner', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data.data)
        return response.data.data
        
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Something went wrong'); 
    }

})

export const fetchManagers = createAsyncThunk('owner/fetchManagers', async (_, {rejectWithValue})=> {
    try {
        const token = getToken()
        const response = await axios.get('http://localhost:1800/company/manager', {
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

export const fetchEmployees = createAsyncThunk('owner/fetchEmployees', async (_, {rejectWithValue})=> {
    try {
        const token = getToken()
        const response = await axios.get('http://localhost:1800/company/employee', {
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

export const addOwner = createAsyncThunk('owner/addOwner', async (newOwner, {rejectWithValue})=> {
    try {
        const response = await axios.post('http://localhost:1800/company/addowner', newOwner, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(response)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Something went wrong')
    }
})

export const addManager = createAsyncThunk('owner/addManager', async (newManager, {rejectWithValue})=> {
    try {
        const response = await axios.post('http://localhost:1800/company/addmanager', newManager, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(response)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Something went wrong')
    }
})

export const addEmployee = createAsyncThunk('owner/addEmployee', async (newEmployee, {rejectWithValue})=> {
    try {
        const response = await axios.post('http://localhost:1800/company/addemployee', newEmployee, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(response)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Something went wrong')
    }
})

export const loginOwner = createAsyncThunk('owner/loginOwner', async (owner, {rejectWithValue})=>{
    try {
        const response = await axios.post('http://localhost:1800/company/login', owner, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        const token = response.data.token
        const user = response.data.user._id
        sessionStorage.setItem('adminToken', token)
        sessionStorage.setItem('userId', user)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Something went wrong')
    }
})

export const deleteManager = createAsyncThunk('owner/deleteManager', async (managerID, {rejectWithValue})=> {
    try {

        const token = getToken()
        const response = await axios.delete(`http://localhost:1800/company/deletemanager?id=${managerID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data
    } catch (error) {
       return rejectWithValue(error.response.data.message)
    }
})

export const deleteEmployee = createAsyncThunk('owner/deleteEmployee', async (employeeID, {rejectWithValue})=> {
    try {

        const token = getToken()

        const response = await axios.delete(`http://localhost:1800/company/deleteemployee?id=${employeeID}`, {
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


export const resetPassword = createAsyncThunk('owner/resetPassword', async (password, {rejectWithValue})=>{
    try {
        const token = getToken()
        const user = sessionStorage.getItem('userId')
        const response = await axios.put(`http://localhost:1800/company/resetpassword?id=${user}`, password )
        console.log(response.data)
        return response.data
    } catch (error) {
       return rejectWithValue(error.response.data.message)
    }
})

export const sendOTP = createAsyncThunk('owner/sendOTP', async (email, {rejectWithValue})=>{
    try {
        const response = await axios.post('http://localhost:1800/company/sendotp', email)
        console.log(response.data)
        const ownerID = response.data.useremail._id 
        sessionStorage.setItem('AdminForgotPasswordId', ownerID)
        return response.data
    } catch (error) {
       return rejectWithValue(error.response.data.message)
    }
})

export const forgotAdminPassword = createAsyncThunk('owner/forgotAdminPassword', async (newPassword, {rejectWithValue})=> {
    try {
        const ownerID = sessionStorage.getItem('AdminForgotPasswordId')
        const response = await axios.put(`http://localhost:1800/company/forgotpassword?id=${ownerID}`, newPassword,)
        console.log(response.data)
        return response.data
    } catch (error) {
       return rejectWithValue(error.response.data.message)
    }
})

const initialState = {
    owners: [],
    managers: [],
    employees: [],
    loading: false,
    error: null,
}

const ownerSlice = createSlice({
    name: 'owner',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {

        //For Fetching Owner Data

        builder.addCase(fetchOwners.pending, (state)=> {
            state.loading = true
            state.error = null
        });

        builder.addCase(fetchOwners.fulfilled, (state, action)=> {
            state.loading = false
            state.owners = action.payload
        });

        builder.addCase(fetchOwners.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })


        // For Fetching Manager Data

        builder.addCase(fetchManagers.pending, (state)=> {
            state.loading = true
        })

        builder.addCase(fetchManagers.fulfilled, (state, action)=> {
            state.loading = false
            state.managers = action.payload
        })

        builder.addCase(fetchManagers.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })
        

        // For Fetching Employee Data 

        builder.addCase(fetchEmployees.pending, (state)=> {
            state.loading = true
        })

        builder.addCase(fetchEmployees.fulfilled, (state, action)=> {
            state.loading = false
            state.employees = action.payload
        })

        builder.addCase(fetchEmployees.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })

        // For Posting New Owner Data

        builder.addCase(addOwner.pending, (state)=> {
            state.loading = true
        })

        builder.addCase(addOwner.fulfilled, (state, action)=> {
            state.loading = false
            state.owners.push(action.payload)
        })

        builder.addCase(addOwner.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })

        // For Posting New Manager Data 

        builder.addCase(addManager.pending, (state)=> {
            state.loading = true
        })

        builder.addCase(addManager.fulfilled, (state, action)=> {
            state.loading = false
            state.managers.push(action.payload)
        })

        builder.addCase(addManager.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })

        // For Posting New Employee Data

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

        // For Owner Login

        builder.addCase(loginOwner.pending, (state)=> {
            state.loading = true
        })

        builder.addCase(loginOwner.fulfilled, (state, action)=> {
            state.loading = false
            state.owners.push(action.payload)
        })

        builder.addCase(loginOwner.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        }) 

        // For Delete Manager Data

        builder.addCase(deleteManager.pending, (state)=> {
            state.loading = true
        })

        builder.addCase(deleteManager.fulfilled, (state, action)=> {
            state.loading = false
        })

        builder.addCase(deleteManager.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })

        // For Delete Employee Data

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


        // For Admin Reset Password

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


        // For Send OTP To Admin

        builder.addCase(sendOTP.pending, (state)=>{
            state.loading = true
        })

        builder.addCase(sendOTP.fulfilled, (state, action)=> {
            state.loading = false
            state.owners.push(action.payload)
        })

        builder.addCase(sendOTP.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })


        // For Forgot Admin Passwords

        builder.addCase(forgotAdminPassword.pending, (state)=>{
            state.loading = true
        })

        builder.addCase(forgotAdminPassword.fulfilled, (state, action)=> {
            state.loading = false
            state.owners.push(action.payload)
        })

        builder.addCase(forgotAdminPassword.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export default ownerSlice.reducer