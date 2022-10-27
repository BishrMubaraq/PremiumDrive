import React from 'react'
import './Otp.scss'
import Logo from '../../../assets/PREMIUMDRIVE.png'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, otp } from '../../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../../../components/Spinner/Spinner'

const OtpVerification = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (data) => {
    const { otpCode } = data
    dispatch(otp(otpCode))
  }

  if (isLoading) {
    return (<><Spinner /></>)
  }

  return (
    <div className="otp_conatainer">
      <div className="otp_wrapper">
        <div className="logo_sec">
          <img src={Logo} alt="PremiumDrive Logo" />
        </div>
        <div className="otp_title">
          <h1>Verification Code</h1>
          <p>Please enter the verification code sent to your number</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input type="text" name='otp' {...register('otpCode', { required: 'Please enter otp' })} />
            {errors.otpCode && <p className="errorMessage">{errors.otpCode?.message}</p>}
          </div>
          <button type='submit'>Verify</button>
        </form>
      </div>
    </div>
  )
}

export default OtpVerification