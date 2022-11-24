import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adminBookingService from './adminBookingService'

const initialState = {
    bookings: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    error: ''
}

// Get Bookings
export const getAllBookings = createAsyncThunk('adminBooking/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.token
        return await adminBookingService.getBookings(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const adminBookingSlice = createSlice({
    name: 'adminBooking',
    initialState,
    reducers: {
        reset: (state) => {
            state.bookings = []
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
            state.error = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBookings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllBookings.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bookings = action.payload
            })
            .addCase(getAllBookings.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})

export const { reset } = adminBookingSlice.actions
export default adminBookingSlice.reducer
