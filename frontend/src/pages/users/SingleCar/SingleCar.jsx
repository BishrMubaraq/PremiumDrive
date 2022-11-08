import React from 'react'
import Layout from '../../../components/users/Layout/Layout'
import SingleCarContent from '../../../components/users/SingleCarContent/SingleCarContent'
import GoToTop from '../../../utils/GoToTop'

const SingleCar = () => {
  return (
    <>
    <Layout children={<SingleCarContent/>} />
    <GoToTop/>
    </>
  )
}

export default SingleCar