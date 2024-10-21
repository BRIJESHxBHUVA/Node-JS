import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchOwners = createAsyncThunk('owner/fetchOwners', async(_, {rejectWithValue})=> {

    try {
        const response = await axios.get('http://localhost:1800/company/owner')
        console.log(response.data.data)
        return response.data.data
        
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong'); 
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
        return rejectWithValue(error.response?.data || 'Something went wrong')
    }
})

const initialState = {
    owners: [],
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
    }
})

export default ownerSlice.reducer