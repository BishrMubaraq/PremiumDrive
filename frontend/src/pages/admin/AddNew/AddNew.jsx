import React from 'react'
import AdminLayout from '../../../components/admin/Layout/Layout'
import AddNewContent from '../../../components/admin/AddNewContent/AddNewContent'

const Booking = () => {
  return (
    <>
    <AdminLayout children={<AddNewContent/>}/>
    </>
  )
}

export default Booking