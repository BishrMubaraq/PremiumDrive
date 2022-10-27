import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminAuthService from './adminAuthService'

const admin = JSON.parse(localStorage.getItem('admin'))

const initialState = {
    admin: admin ? admin : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

// Login Admin

export const loginAdmin = createAsyncThunk('adminAuth/login', async (admin, thunkAPI) => {
    try {
        return await adminAuthService.login(admin)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Logout Admin
export const adminLogout = createAsyncThunk('adminAuth/logout', async () => {
    await adminAuthService.logout()
})


export const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.admin = action.payload
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.admin = null
            })
            .addCase(adminLogout.fulfilled, (state) => {
                state.admin = null
            })
    }
})
export const { reset } = adminAuthSlice.actions
export default adminAuthSlice.reducer