import React from 'react'
import 'remixicon/fonts/remixicon.css'
import { Routes,Route } from 'react-router-dom'
import Signup from '../pages/driver/Signup/Signup'
import Login from '../pages/driver/Login/Login'

const DriverRoute = () => {
  return (
    <>
    <Routes>
      <Route path='/driver/register' element={<Signup/>} />
      <Route path='/driver/login' element={<Login/>} />
    </Routes>
    </>
  )
}

export default DriverRoute