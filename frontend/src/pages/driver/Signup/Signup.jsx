import React, { useEffect, useState } from 'react'
import './Signup.scss'
import Logo from '../../../assets/PREMIUMDRIVE.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { reset, registerDriver } from '../../../redux/features/driverAuth/driverAuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../../../components/Spinner/Spinner'


function Signup() {

    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const [profilePic, setProfilePic] = useState()
    const [licenseFront, setLicenseFront] = useState()
    const [licenseRear, setLicenseRear] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, driver, isSuccess, isError, message, error } = useSelector((state) => state.driverAuth)

    useEffect(() => {
        if (isError) {
            toast.error(error)
        }
        if (isSuccess) {
            toast.success(message.message)
            navigate('/driver/login')
        }
        if (driver) {
            navigate('/driver')
        }
        dispatch(reset())
    }, [dispatch, navigate, message, error, isError, isSuccess])


    const setFileToBase = (file, cb) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            cb(reader.result)
        }
    }

    const onSubmit = (data) => {
        const { name, email, phoneNumber, password } = data
        const driverData = { name, email, phoneNumber, password, profilePic, drivingLicenceFront: licenseFront, drivingLicenceRear: licenseRear }
        dispatch(registerDriver(driverData))
    }

    if(isLoading){
        return(<Spinner/>)
    }

    return (
        <div className="driver_container">
            <div className="login_wrapper">

                <div className="logo_wrapper">
                    <img src={Logo} alt="" />
                </div>
                <h1>Driver Registration</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input type={'text'} name='name' placeholder='Name' {...register('name', {
                            required: 'Please enter name'
                        })} />
                        {errors.name && <p className="errorMessage">{errors.name?.message}</p>}
                    </div>
                    <div>
                        <input type={'email'} name='email' placeholder='Email' {...register('email', {
                            required: 'Please enter email', pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })} />
                        {errors.email && <p className="errorMessage">{errors.email?.message}</p>}
                    </div>
                    <div>
                        <input type={'tel'} name='phoneNumber' placeholder='Phone Number' {...register('phoneNumber', { required: 'Please enter phone number', minLength: { value: 10, message: 'Phone number must be 10 numbers' }, maxLength: { value: 10, message: 'Phone number cannot exceed more than 10 numbers' } })} />
                        {errors.phoneNumber && <p className="errorMessage">{errors.phoneNumber?.message}</p>}
                    </div>
                    <div>
                        <input type={'password'} name='password' placeholder='Password' {...register('password', { required: 'Please enter password', minLength: { value: 8, message: 'Password must be 8 characters' } })} />
                        {errors.password && <p className="errorMessage">{errors.password?.message}</p>}
                    </div>
                    <div>
                        <input type={'password'} name='password2' placeholder='Confirm Password' {...register('password2', {
                            required: 'Please enter Confirm password', validate: (val) => {
                                if (watch('password') !== val) {
                                    return 'Passwords are not match'
                                }
                            }
                        })} />
                        {errors.password2 && <p className="errorMessage">{errors.password2?.message}</p>}
                    </div>

                    <div>
                        <legend>Profile Photo</legend>
                        <input type={'file'} name='profilePic' onChange={(e) => {
                            const file = e.target.files[0]
                            setFileToBase(file, setProfilePic)
                        }} accept='image/*' required />
                    </div>
                    <div>
                        <legend>Driving License Front</legend>
                        <input type={'file'} name='DrivingLicenseFront' onChange={(e) => {
                            const file = e.target.files[0]
                            setFileToBase(file, setLicenseFront)
                        }} accept='image/*' required />
                    </div>
                    <div>
                        <legend>Driving License Rear</legend>

                        <input type={'file'} name='DrivingLicenseRear' onChange={(e) => {
                            const file = e.target.files[0]
                            setFileToBase(file, setLicenseRear)
                        }} accept='image/*' required />
                    </div>
                    <button type='submit'>Signup</button>
                </form>
                <p className='signup_link'>Already have account? <span><Link to={'/driver/login'}>Login</Link></span></p>
            </div>
        </div>
    )
}

export default Signup