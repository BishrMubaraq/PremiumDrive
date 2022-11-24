import React from 'react'
import { Route, Routes, Navigate,Outlet } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import AdminLogin from '../pages/admin/Login/Login'
import Cars from '../pages/admin/Cars/Cars'
import Users from '../pages/admin/Users/Users'
import Dashboard from '../pages/admin/Dashboard/Dashboard'
import Booking from '../pages/admin/Booking/Booking'
import AddBrand from '../pages/admin/AddBrand/AddBrand'
import AddPlace from '../pages/admin/AddPlace/AddPlace'
import Drivers from '../pages/admin/Drivers/Drivers'
import Inbox from '../pages/admin/Inbox/Inbox'
import ChatBox from '../pages/admin/ChatBox/ChatBox'



const AdminRoute = () => {
  return (
    <>
      <Routes>
        <Route path='/admin/login/' element={<AdminLogin />} />
        <Route element={<ProtectedRoute/>}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/cars/' element={<Cars />} />
        <Route path='/admin/bookings/' element={<Booking />} />
        <Route path='/admin/users/' element={<Users />} />
        <Route path='/admin/add-place/' element={<AddPlace />} />
        <Route path='/admin/add-brand/' element={<AddBrand />} />
        <Route path='/admin/drivers/' element={<Drivers />} />
        <Route path='/admin/inbox/' element={<Inbox />} />
        <Route path='/admin/message/' element={<ChatBox />} />
        </Route>
      </Routes>
    </>
  )
}

function ProtectedRoute() {
  let auth = localStorage.getItem('admin')
  if(!auth){
    return <Navigate to={'/admin/login'} replace />
  }
  return <Outlet/>
}

export default AdminRoute