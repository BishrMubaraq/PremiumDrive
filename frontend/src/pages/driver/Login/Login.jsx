import React, { useEffect, useState } from 'react'
import '../Signup/Signup.scss'
import Logo from '../../../assets/PREMIUMDRIVE.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { reset, driverLogin } from '../../../redux/features/driverAuth/driverAuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../../../components/Spinner/Spinner'


function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, driver, isSuccess, isError, message, error } = useSelector((state) => state.driverAuth)
    useEffect(()=>{
        if(isError){
            toast.error(error)
        }
        if(isSuccess || driver){
            navigate('/driver')
        }
        dispatch(reset())
    },[isError,error,isSuccess,driver,dispatch])

    const onSubmit = (data) => {
        dispatch(driverLogin(data))
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
                <h1>Driver Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        <input type={'password'} name='password' placeholder='Password' {...register('password', { required: 'Please enter password', minLength: { value: 8, message: 'Password must be 8 characters' } })} />
                        {errors.password && <p className="errorMessage">{errors.password?.message}</p>}
                    </div>
                  
                    <button type='submit'>Login</button>
                </form>
                <p className='signup_link'>Create new Accout? <span><Link to={'/driver/register'}>Signup</Link></span></p>
            </div>
        </div>
    )
}

export default Login