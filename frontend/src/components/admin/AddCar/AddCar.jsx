import React, { useState } from 'react'
import './AddCar.scss'
import { useForm } from 'react-hook-form'
import previewImage from '../../../assets/previewDemo.jpg'
import axios from 'axios'
import { toast } from 'react-toastify'


const AddCar = ({ type, stateChange }) => {

    const [imageData, setImageData] = useState()
    const [preview, setPreview] = useState()
    const [image, setImage] = useState()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleFileChange = ({ target }) => {
        setImageData(target.files[0])
        setImage(target.value)
        setPreview(URL.createObjectURL(target.files[0]))
    }

    const onSubmit = async (data) => {
        const { name, rent, body, place, brand, transmission, fuel, registrationNo } = data

        const formData = new FormData()
        formData.append('image', imageData)
        const carData = { name, rent, body, place, brand, transmission, fuel, registrationNo, formData }
        await axios.post('http://localhost:5000/api/admin/addCars', carData, {
            headers:{
                Authorization:localStorage.getItem("admin").token
            }
        }).then((res) => {
            toast.success(res.message)
        }).catch((error) => {
            toast.error(error)
        })

    }

    return (
        <div className="add_car_container">
            <div className="add_car_wrapper">
                <div className="add_car_header">
                    <h1>{type} Car</h1>
                    <span onClick={() => {
                        stateChange(false)
                    }}><i className="ri-close-fill"></i></span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='add_car_form_wrapper'>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Name</label>
                        <input type="text" name="name" {...register('name', { required: 'Please enter name' })} />
                        {errors.name && <p className='errorMessage'>{errors.name?.message}</p>}
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Rent</label>
                        <input type="text" name="rent" id="" {...register('rent', { required: 'Please enter rent' })} />
                        {errors.rent && <p className='errorMessage'>{errors.rent?.message}</p>}
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Place</label>
                        <select name="place" {...register('place', { required: 'Please select place' })}>
                            <optgroup>
                                <option hidden value=''>Select City</option>
                                <option value="Calicut">Calicut</option>
                                <option value="Kochi">Kochi</option>
                            </optgroup>
                        </select>
                        {errors.place && <p className='errorMessage'>{errors.place?.message}</p>}
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Brand</label>
                        <input type="text" name="brand" id="" {...register('brand', { required: 'Please enter brand' })} />
                        {errors.brand && <p className='errorMessage'>{errors.brand?.message}</p>}
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Type</label>
                        <select name="body" {...register('body', { required: 'Please select type' })}>
                            <optgroup>
                                <option hidden value=''>Select Type</option>
                                <option value="SUV">SUV</option>
                                <option value="Sedan">Sedan</option>
                                <option value="MPV">MPV</option>
                                <option value="Hatchback">Hatchback</option>
                                <option value="LifeStyle Truck">Lifestyle Truck</option>
                            </optgroup>
                        </select>
                        {errors.body && <p className='errorMessage'>{errors.body?.message}</p>}
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Transmission</label>
                        <select name="transmission" id="" {...register('transmission', { required: 'Please select transmission' })}>
                            <optgroup>
                                <option hidden value=''>Select Transmission</option>
                                <option value="Auto">Auto</option>
                                <option value="Manual">Manual</option>
                            </optgroup>
                        </select>
                        {errors.transmission && <p className='errorMessage'>{errors.transmission?.message}</p>}
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Fuel</label>
                        <select name="fuel" {...register('fuel', { required: 'Please select fuel' })}>
                            <optgroup>
                                <option hidden value=''>Select Fuel Type</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="EV">EV</option>
                            </optgroup>
                        </select>
                        {errors.fuel && <p className='errorMessage'>{errors.fuel?.message}</p>}
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Registration No.</label>
                        <input type="text" name="registrationNo" id="" {...register('registrationNo', { required: 'Please enter registration number' })} />
                        {errors.registrationNo && <p className='errorMessage'>{errors.registrationNo?.message}</p>}
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Image</label>
                        <img className='previewImage' src={preview ? preview : previewImage} alt="preview" />
                        <input type={'file'} name="image" value={image} accept='image/*' required onChange={handleFileChange} />
                    </div>
                    <button type='submit'>{type}</button>
                </form>
            </div>
        </div>
    )
}

export default AddCar