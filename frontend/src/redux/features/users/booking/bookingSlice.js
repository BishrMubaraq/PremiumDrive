import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

const initialState = {
    bookings: [],
    bookingIsLoading: false,
    bookingIsSuccess: false,
    bookingIsError: false,
    bookingMessage: '',
    bookingError: ''
}

// Book a car
export const bookCar = createAsyncThunk('booking/bookCar', async (bookingData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await bookingService.bookCar(bookingData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Booking payment
export const bookingPayment = createAsyncThunk('booking/payment', async (checkoutData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await bookingService.payCar(checkoutData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// User Bookings
export const userBookings = createAsyncThunk('booking/get', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await bookingService.userBookings(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        bookingReset: (state) => {
            state.bookings = []
            state.bookingIsLoading = false
            state.bookingIsSuccess = false
            state.bookingIsError = false
            state.bookingMessage = ''
            state.bookingError = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(bookCar.pending, (state) => {
                state.bookingIsLoading = true
            })
            .addCase(bookCar.fulfilled, (state, action) => {
                state.bookingIsLoading = false
                state.bookingIsSuccess = true
                state.bookingMessage = action.payload
            })
            .addCase(bookCar.rejected, (state, action) => {
                state.bookingIsLoading = false
                state.bookingIsError = true
                state.bookingError = action.payload
            })
            .addCase(bookingPayment.pending, (state) => {
                state.bookingIsLoading = true
            })
            .addCase(bookingPayment.fulfilled, (state, action) => {
                state.bookingIsLoading = false
                state.bookingIsSuccess = true
                state.bookingMessage = action.payload
            })
            .addCase(bookingPayment.rejected, (state, action) => {
                state.bookingIsLoading = false
                state.bookingIsError = true
                state.bookingError = action.payload
            })
            .addCase(userBookings.pending, (state) => {
                state.bookingIsLoading = true
            })
            .addCase(userBookings.fulfilled, (state, action) => {
                state.bookingIsLoading = false
                state.bookingIsSuccess = true
                state.bookings = action.payload
            })
            .addCase(userBookings.rejected, (state, action) => {
                state.bookingIsLoading = false
                state.bookingIsError = true
                state.bookingError = action.payload
            })

    }
})

export const { bookingReset } = bookingSlice.actions
export default bookingSlice.reducer