import React from 'react'
import AdminLayout from '../../../components/admin/Layout/Layout'
import UsersContent from '../../../components/admin/UsersContent/UsersContent'


const Users = () => {
  
  return (
    <>
    <AdminLayout children={<UsersContent />} />
    </>
  )
}

export default Users