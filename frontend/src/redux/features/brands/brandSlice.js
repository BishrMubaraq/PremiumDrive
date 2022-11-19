import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import brandService from './brandService'


const initialState = {
    brands: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    error: ''
}

// add brand
export const addBrand = createAsyncThunk('brands/add', async (brand, thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.token
        return await brandService.addBrand(brand, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get brands
export const getBrands = createAsyncThunk('brands/get', async (_, thunkAPI) => {
    try {
        return await brandService.getBrands()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete brand
export const deleteBrand = createAsyncThunk('brands/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.token
        return await brandService.deleteBrand(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const brandSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {
        reset: (state) => {
            state.brands= []
            state.isLoading= false
            state.isSuccess= false
            state.isError= false
            state.message= ''
            state.error= ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addBrand.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addBrand.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(addBrand.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
            .addCase(getBrands.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.brands = action.payload
            })
            .addCase(getBrands.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
            .addCase(deleteBrand.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(deleteBrand.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })

    }
})

export const { reset } = brandSlice.actions
export default brandSlice.reducer