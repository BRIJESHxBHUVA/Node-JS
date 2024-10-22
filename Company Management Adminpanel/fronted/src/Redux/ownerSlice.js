import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = ()=> {
    return(
        sessionStorage.getItem('adminToken')
    )
}

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

export const loginOwner = createAsyncThunk('owner/loginOwner', async (owner, {rejectWithValue})=>{
    try {
        const response = await axios.post('http://localhost:1800/company/login', owner, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        const token = response.data.token
        sessionStorage.setItem('adminToken', token)
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

const initialState = {
    owners: [],
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
    }
})

export default ownerSlice.reducer