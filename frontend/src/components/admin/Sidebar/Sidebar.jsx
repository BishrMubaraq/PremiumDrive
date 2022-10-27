import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.scss'
import { useDispatch } from 'react-redux'
import { adminLogout } from '../../../redux/features/adminAuth/adminAuthSlice'

const Sidebar = () => {
 const dispatch=useDispatch()
 const logout=()=>{
  dispatch(adminLogout())
 
 }

  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <h1><i class="ri-roadster-fill"></i>PremiumDrive</h1>
      </div>
      <div className="sidebar_content">
        <div className="menu">
          <ul className="nav_list">
            <li className="nav_item">
              <NavLink className={(navClass) => navClass.isActive ? "nav_active nav_link" : 'nav_link'} to='/admin/dashboard'><span><i class="ri-dashboard-fill"></i></span> Dashboard</NavLink>
              <NavLink className={(navClass) => navClass.isActive ? "nav_active nav_link" : 'nav_link'} to='/admin/cars'><span><i class="ri-car-fill"></i></span> Cars</NavLink>
              <NavLink className={(navClass) => navClass.isActive ? "nav_active nav_link" : 'nav_link'} to='/admin/bookings'><span><i class="ri-booklet-fill"></i></span> Bookings</NavLink>
              <NavLink className={(navClass) => navClass.isActive ? "nav_active nav_link" : 'nav_link'} to='/admin/users'><span><i class="ri-group-fill"></i></span> Users</NavLink>
            </li>
          </ul>
        </div>
        <div className="sidebar_bottom">
          <span onClick={logout}><i className="ri-logout-circle-line"></i> Logout</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar