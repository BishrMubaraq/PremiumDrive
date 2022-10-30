import React from 'react'
import CarContent from '../../../components/users/CarContent/CarContent'
import Layout from '../../../components/users/Layout/Layout'
import GoToTop from '../../../utils/GoToTop'

const Cars = () => {
  return (
    <>
    <Layout children={<CarContent/>} />
    <GoToTop/>
    </>
  )
}

export default Cars