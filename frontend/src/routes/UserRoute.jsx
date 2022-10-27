import React from 'react'
import 'remixicon/fonts/remixicon.css'
import { Routes,Route } from 'react-router-dom'
import Home from '../pages/users/Home/Home'
import Login from '../pages/users/Login/Login'
import Signup from '../pages/users/Signup/Signup'
import OtpVerification from '../pages/users/OtpVerification/OtpVerification'
import Cars from '../pages/users/Cars/Cars'

const UserRoute = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/otp' element={<OtpVerification/>} />
      <Route path='/cars' element={<Cars/>} />

    </Routes>
    </>
  )
}

export default UserRoute