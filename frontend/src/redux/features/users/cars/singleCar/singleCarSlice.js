import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import singleCarService from "./singleCarService";

const initialState={
    car:{},
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:'',
    error:''
}

// get car details
export const getCar=createAsyncThunk('singleCar/get',async(id,thunkAPI)=>{
    try {
        return await singleCarService.getCar(id)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const singleCarSlice=createSlice({
    name:'singleCar',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=false
            state.car={}
            state.message=''
            state.error=''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getCar.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getCar.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.car=action.payload
        })
        .addCase(getCar.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.error=action.payload
        })
    }
})

export const {reset}=singleCarSlice.actions
export default singleCarSlice.reducer