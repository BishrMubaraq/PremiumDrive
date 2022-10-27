import React from 'react'
import AdminLayout from '../../../components/admin/Layout/Layout'
import BookingContent from '../../../components/admin/BookingContent/BookingContent'

const Booking = () => {
  return (
    <>
    <AdminLayout children={<BookingContent/>}/>
    </>
  )
}

export default Booking