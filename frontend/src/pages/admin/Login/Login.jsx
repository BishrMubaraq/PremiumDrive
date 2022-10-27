import LogoImg from '../../../assets/PremiumDriveLogo.jpg'
import LoginButton from '../../../components/LoginButton'
import LoginInput from '../../../components/LoginInput'
import './Login.scss'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { loginAdmin, reset } from '../../../redux/features/adminAuth/adminAuthSlice'
import Spinner from '../../../components/Spinner/Spinner'



const AdminLogin = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { admin, isLoading, isSuccess, isError, message } = useSelector((state) => state.adminAuth)
  const { register, formState: { errors }, handleSubmit } = useForm()

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || admin){
      navigate('/admin')
    }
    dispatch(reset())
  },[isError,isSuccess,admin,message,dispatch,navigate])

  const onSubmit = (data) => {
    dispatch(loginAdmin(data))
  }
  if(isLoading){
    return(<Spinner/>)
  }
  return (
    <div className="login_container">
      <div className="login_wrapper">
        <div className="head">
          <img src={LogoImg} alt="" />
          <h1>Admin</h1>
        </div>
        <div className="field">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <LoginInput name='adminId' placeholder='AdminId' {...register('adminId', { required: 'Please enter adminId' })} />
              {errors.adminId && <p className="errorMessage">{errors.adminId?.message}</p>}
            </div>
            <div>
              <LoginInput type={'password'} name='password' placeholder='Password' {...register('password', { required: 'Please enter password' })} />
              {errors.password && <p className="errorMessage">{errors.password?.message}</p>}
            </div>
            <LoginButton>Login</LoginButton>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin