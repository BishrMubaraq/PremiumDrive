import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import TopNav from '../TopNav/TopNav'
import './Layout.scss'
 
const AdminLayout = ({children}) => {
  return (
    <div className="layout">
      <Sidebar/>
      <div className="main_layout">
        <TopNav/>
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout