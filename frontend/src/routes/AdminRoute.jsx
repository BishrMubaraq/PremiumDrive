import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import AdminLogin from '../pages/admin/Login/Login'
import Cars from '../pages/admin/Cars/Cars'
import Users from '../pages/admin/Users/Users'
import Dashboard from '../pages/admin/Dashboard/Dashboard'
import Booking from '../pages/admin/Booking/Booking'
import AddBrand from '../pages/admin/AddBrand/AddBrand'
import AddPlace from '../pages/admin/AddPlace/AddPlace'
import Drivers from '../pages/admin/Drivers/Drivers'


const AdminRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/login/' element={<AdminLogin />} />
        <Route path='/admin/cars/' element={<Cars />} />
        <Route path='/admin/users/' element={<Users />} />
        <Route path='/admin/bookings/' element={<Booking />} />
        <Route path='/admin/add-place/' element={<AddPlace />} />
        <Route path='/admin/add-brand/' element={<AddBrand />} />
        <Route path='/admin/drivers/' element={<Drivers />} />
      </Routes>
    </>
  )
}

export default AdminRoute