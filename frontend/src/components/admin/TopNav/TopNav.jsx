import React from 'react'
import './TopNav.scss'
import {Link} from 'react-router-dom'

const TopNav = () => {
  return (
    <div className="top_nav">
      <div className="top_nav-wrapper">
        <div className="search_box">
          <input type="text" placeholder='search or type' />
          <span><i className="ri-search-line"></i></span>
        </div>
        <div className="top_nav-right">
          <span className='notification'><i className="ri-notification-4-fill"></i></span>
          <div className="profile">
            <Link className='profile_pic' to='/admin/settings'><i className="ri-account-circle-fill"></i></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNav