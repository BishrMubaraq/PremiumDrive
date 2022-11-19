import React from 'react'
import CheckoutContent from '../../../components/users/CheckoutContent/CheckoutContent'
import Layout from '../../../components/users/Layout/Layout'
import GoToTop from '../../../utils/GoToTop'
const Checkout = () => {
  return (
    <>
    <Layout children={<CheckoutContent/>}/>
    <GoToTop/>
    </>
  )
}

export default Checkout