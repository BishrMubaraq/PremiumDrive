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
        
      </div>
    </div>
  )
}

export default TopNav