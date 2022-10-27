import React from 'react'
import CarContent from '../../../components/users/CarContent/CarContent'
import Layout from '../../../components/users/Layout/Layout'

const Cars = () => {
  return (
    <>
    <Layout children={<CarContent/>} />
    </>
  )
}

export default Cars