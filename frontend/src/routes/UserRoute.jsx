import React from 'react'
import 'remixicon/fonts/remixicon.css'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Home from '../pages/users/Home/Home'
import Login from '../pages/users/Login/Login'
import Signup from '../pages/users/Signup/Signup'
import OtpVerification from '../pages/users/OtpVerification/OtpVerification'
import Cars from '../pages/users/Cars/Cars'
import SingleCar from '../pages/users/SingleCar/SingleCar'
import UserProfile from '../pages/users/UserProfile/UserProfile'
import Checkout from '../pages/users/Checkout/Checkout'
import ErrorPage from '../pages/Error/ErrorPage'
import MyBookings from '../pages/users/MyBookings/myBookings'
import Chat from '../pages/users/ChatPage/Chat'

const UserRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/otp' element={<OtpVerification />} />
      <Route path='/cars' element={<Cars />} />
      <Route path='/car' element={<SingleCar />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/ask-to-admin' element={<Chat />} />
      </Route>
      {/* <Route path='*' element={<ErrorPage />} /> */}
    </Routes>
  )
}

export default UserRoute;

export function ProtectedRoute() {
  let auth = localStorage.getItem('user')
  if (!auth) {
    return <Navigate to={'/login'} replace />
  }
  return <Outlet />
}