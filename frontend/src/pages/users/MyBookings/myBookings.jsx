import React from 'react'
import MyBookingContent from '../../../components/users/myBookingContents/myBookingContent'
import Layout from '../../../components/users/Layout/Layout'
import GoToTop from '../../../utils/GoToTop'


const MyBookings = () => {
  return (
    <>
    <Layout children={<MyBookingContent/>} />
    <GoToTop/>
    </>
  )
}

export default MyBookings