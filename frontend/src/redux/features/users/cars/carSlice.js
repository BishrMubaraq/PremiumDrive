import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import carService from "./carService";

const initialState={
    cars:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:''
}

// get all cars
export const allCars=createAsyncThunk('userCars/getCars',async(_,thunkAPI)=>{
    try {
        return await carService.getCars()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const carSlice=createSlice({
    name:'userCars',
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers:(builder)=>{
        builder
        .addCase(allCars.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(allCars.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.cars=action.payload
        })
        .addCase(allCars.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
    }
})

export const {reset} =carSlice.actions
export default carSlice.reducer