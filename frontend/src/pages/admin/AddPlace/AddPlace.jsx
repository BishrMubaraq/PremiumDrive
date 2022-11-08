import React from 'react'
import AdminLayout from '../../../components/admin/Layout/Layout'
import AddPlace from '../../../components/admin/AddPlace/AddPlace'

const Booking = () => {
  return (
    <>
    <AdminLayout children={<AddPlace/>}/>
    </>
  )
}

export default Booking