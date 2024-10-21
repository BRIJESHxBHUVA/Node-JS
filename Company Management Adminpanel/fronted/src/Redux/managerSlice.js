import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchManagers = createAsyncThunk('manager/fetchManagers', async(_, {rejectWithValue})=>{
    try {
        const response = await axios.get('http://localhost:1800/company/manager/getmanager')
        console.log(response)
        return response.data.data
    } catch (error) {
        rejectWithValue(error.response?.data || 'Something went wrong')
    }
})

export const addManagers = createAsyncThunk('manager/addManagers', async (newManager, {rejectWithValue})=> {
    try {
        const response = await axios.post('http://localhost:1800/company/manager/addmanager', newManager, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(response)
        return response.data.data
    } catch (error) {
        rejectWithValue(error.response?.data || 'Something went wrong')
    }
})

const initialState = {
    managers: [],
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

        // For Post New Manager Data

        builder.addCase(addManagers.pending, (state)=> {
            state.loading = true
        })

        builder.addCase(addManagers.fulfilled, (state, action)=> {
            state.loading = false
            state.managers.push(action.payload)
        })

        builder.addCase(addManagers.rejected, (state, action)=> {
            state.loading = false
            state.managers = action.payload
        })
    }
})


export default managerSlice.reducer