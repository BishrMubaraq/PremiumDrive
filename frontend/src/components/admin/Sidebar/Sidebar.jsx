import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.scss'
import { useDispatch } from 'react-redux'
import { adminLogout } from '../../../redux/features/adminAuth/adminAuthSlice'

const Sidebar = () => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(adminLogout())

  }

  return (
    <>
      <div className="sidebar">
        <div className="sidebar_top">
          <h1><i className="ri-roadster-fill"></i>PremiumDrive</h1>
        </div>
        <div className="sidebar_content">
          <div className="menu">
            <ul className="nav_list">
              <li className="nav_item">
                <NavLink className={(navClass) => navClass.isActive ? "nav_active nav_link" : 'nav_link'} to='/admin/dashboard'><span><i className="ri-dashboard-fill"></i></span> <span className='nav_link_label'>Dashboard</span></NavLink>
                <NavLink className={(navClass) => navClass.isActive ? "nav_active nav_link" : 'nav_link'} to='/admin/cars'><span><i className="ri-car-fill"></i></span> <span className='nav_link_label'>Cars</span></NavLink>
                <NavLink className={(navClass) => navClass.isActive ? "nav_active nav_link" : 'nav_link'} to='/admin/bookings'><span><i className="ri-booklet-fill"></i></span> <span className='nav_link_label'>Bookings</span></NavLink>
                <NavLink className={(navClass) => navClass.isActive ? "nav_active nav_link" : 'nav_link'} to='/admin/drivers'><span><i className="ri-user-2-fill"></i></span> <span className='nav_link_label'>Drivers</span></NavLink>
                <NavLink className={(navClass) => navClass.isActive ? "nav_active nav_link" : 'nav_link'} to='/admin/users'><span><i className="ri-group-fill"></i></span> <span className='nav_link_label'>Users</span></NavLink>
                <hr />
                <NavLink className={(navClass) => navClass.isActive ? "nav_active nav_link" : 'nav_link'} to='/admin/add-place'><span><i className="ri-landscape-fill"></i></span> <span className='nav_link_label'>Add Place</span></NavLink>
                <NavLink className={(navClass) => navClass.isActive ? "nav_active nav_link" : 'nav_link'} to='/admin/add-brand'><span><i className="ri-price-tag-3-fill"></i></span> <span className='nav_link_label'>Add Brand</span></NavLink>
              </li>
            </ul>
          </div>
          <div className="sidebar_bottom">
            <span onClick={logout}><i className="ri-logout-circle-line"></i> <span className='logout_label'>Logout</span></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar