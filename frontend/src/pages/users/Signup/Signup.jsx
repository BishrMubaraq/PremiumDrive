import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import '../Login/Login.scss'
import Logo from '../../../assets/PREMIUMDRIVE.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { userRegister, reset } from '../../../redux/features/auth/authSlice'
import Spinner from '../../../components/Spinner/Spinner'

function Signup() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isError, isSuccess, isLoading, message, user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      navigate('/otp')
    }
    if (user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, message, user, navigate, dispatch])

  const onSubmit = (data) => {
    const { name, email, phoneNumber, password } = data
    const userData = { name, email, phoneNumber, password }
    dispatch(userRegister(userData))

  }
  if (isLoading) {
    return (<><Spinner /></>)
  }

  return (
    <div className="container">
      <div className="login_wrapper">

        <div className="logo_wrapper">
          <img src={Logo} alt="" />
        </div>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input type={'text'} name='name' placeholder='Name' {...register('name', { required: 'Please enter name', minLength: { value: 3, message: 'Name must be 3 or more characters' } })} />
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
          <button type='submit'>Signup</button>
        </form>
        <p>OR</p>
        <button className='google_btn'>Signup with Google</button>
        <p className='signup_link'>Already have account? <span><Link to={'/login'}>Login</Link></span></p>
      </div>
    </div>
  )
}

export default Signup