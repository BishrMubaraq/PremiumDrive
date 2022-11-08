import React from 'react'
import AdminLayout from '../../../components/admin/Layout/Layout'
import AddBrand from '../../../components/admin/AddBrand/AddBrand'

const Booking = () => {
  return (
    <>
    <AdminLayout children={<AddBrand/>}/>
    </>
  )
}

export default Booking