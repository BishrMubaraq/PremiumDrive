import React from 'react'
import {useForm} from 'react-hook-form'
import { addPlace,placeReset} from '../../../redux/features/places/placeSlice'
import { useDispatch } from 'react-redux'

import { useEffect } from 'react';

const AddPlaceModal = ({stateChange}) => {
    const {register,formState:{errors},handleSubmit}=useForm()
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(placeReset())
    },[dispatch])
    const onSubmit=(data)=>{
        dispatch(addPlace(data))
    }
  return (
    <div className="add_car_container">
            <div className="add_car_wrapper">
                <div className="add_car_header">
                    <h1>Add place</h1>
                    <span><i onClick={()=>{
                        stateChange(false)
                    }} className="ri-close-fill"></i></span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='add_car_form_wrapper'>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Place</label>
                        <input type="text" name='place' {...register('place',{required:'Please enter place'})} />
                       {errors.place&&<p className="errorMessage">{errors.place?.message}</p>}
                    </div>
                    <button type='submit'>Add</button>
                </form>
            </div>
        </div>
  )
}

export default AddPlaceModal