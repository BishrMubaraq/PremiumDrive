import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import placeService from "./placeService";

const initialState = {
    places: [],
    placeIsLoading: false,
    placeIsSuccess: false,
    placeIsError: false,
    placeMessage: '',
    placeError: ''
}


// add place
export const addPlace = createAsyncThunk('places/add', async (place, thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.token
        return await placeService.addPlace(place, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get places
export const getPlaces = createAsyncThunk('places/get', async (_, thunkAPI) => {
    try {
        return await placeService.getPlaces()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete place
export const deletePlace = createAsyncThunk('places/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.token
        return await placeService.deletePlace(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const placeSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        placeReset: (state) => {
            state.placeError = ''
            state.placeIsError = false
            state.placeMessage = ''
            state.placeIsLoading = false
            state.placeIsSuccess = false
            state.places = []

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addPlace.pending, (state) => {
                state.placeIsLoading = true
            })
            .addCase(addPlace.fulfilled, (state, action) => {
                state.placeIsLoading = false
                state.placeIsSuccess = true
                state.placeMessage = action.payload
            })
            .addCase(addPlace.rejected, (state, action) => {
                state.placeIsLoading = false
                state.placeIsError = true
                state.placeError = action.payload
            })
            .addCase(getPlaces.pending, (state) => {
                state.placeIsLoading = true
            })
            .addCase(getPlaces.fulfilled, (state, action) => {
                state.placeIsLoading = false
                state.placeIsSuccess = true
                state.places = action.payload
            })
            .addCase(getPlaces.rejected, (state, action) => {
                state.placeIsLoading = false
                state.placeIsError = true
                state.placeError = action.payload
            })
            .addCase(deletePlace.pending, (state) => {
                state.placeIsLoading = true
            })
            .addCase(deletePlace.fulfilled, (state, action) => {
                state.placeIsLoading = false
                state.placeIsSuccess = true
                state.placeMessage = action.payload
            })
            .addCase(deletePlace.rejected, (state, action) => {
                state.placeIsLoading = false
                state.placeIsError = true
                state.placeError = action.payload
            })
    }
})

export const { placeReset } = placeSlice.actions
export default placeSlice.reducer