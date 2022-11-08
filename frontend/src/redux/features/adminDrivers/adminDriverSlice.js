import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adminDriverService from './adminDriverService'

const initialState = {
    drivers: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    error: ''
}

// Get Drivers
export const getAllDrivers = createAsyncThunk('adminDriver/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.token
        return await adminDriverService.getDrivers(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Approve Driver
export const approveDriver = createAsyncThunk('adminDriver/approve', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.token
        return await adminDriverService.approveDriver(id,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Decline Driver
export const declineDriver = createAsyncThunk('adminDriver/decline', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.token
        return await adminDriverService.declineDriver(id,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Block and unblock driver
export const blockAndUnblockDriver = createAsyncThunk('adminDriver/blockAndUnblock', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.token
        return await adminDriverService.blockAndUnblockDriver(id,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const adminDriverSlice = createSlice({
    name: 'adminDriver',
    initialState,
    reducers: {
        reset: (state) => {
            state.drivers = []
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
            state.error = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllDrivers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllDrivers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.drivers = action.payload
            })
            .addCase(getAllDrivers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
            .addCase(approveDriver.pending, (state) => {
                state.isLoading = true
            })
            .addCase(approveDriver.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(approveDriver.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
            .addCase(declineDriver.pending, (state) => {
                state.isLoading = true
            })
            .addCase(declineDriver.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(declineDriver.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
            .addCase(blockAndUnblockDriver.pending, (state) => {
                state.isLoading = true
            })
            .addCase(blockAndUnblockDriver.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(blockAndUnblockDriver.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})

export const { reset } = adminDriverSlice.actions
export default adminDriverSlice.reducer