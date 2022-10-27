import React, { useEffect } from 'react'
import './Login.scss'
import Logo from '../../../assets/PREMIUMDRIVE.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Spinner from '../../../components/Spinner/Spinner'
import { login, reset } from '../../../redux/features/auth/authSlice'

function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [isError, user, message, isSuccess, navigate, dispatch])

  const onSubmit = (data) => {
    dispatch(login(data))
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
        <h1>Login</h1>
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
            <input type={'password'} name='password' placeholder='Password' {...register('password', { required: 'Please enter password', minLength: { value: 5, message: 'Password must be 8 characters' } })} />
            {errors.password && <p className="errorMessage">{errors.password?.message}</p>}
          </div>
          <div className="forget_password">
            <Link>Forgot Password?</Link>
          </div>
          <button type='submit'>Login</button>
        </form>
        <p>OR</p>
        <button className='google_btn'>Signin with Google</button>
        <p className='signup_link'>Create new Accout? <span><Link to={'/signup'}>Signup</Link></span></p>
      </div>
    </div>
  )
}

export default Login