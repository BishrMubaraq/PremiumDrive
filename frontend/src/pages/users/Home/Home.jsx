import React from 'react'
import HomeContent from '../../../components/users/HomeContent/HomeContent'
import Layout from '../../../components/users/Layout/Layout'
import GoToTop from '../../../utils/GoToTop'


const Home = () => {
  return (
    <>
    <Layout children={<HomeContent/>} />
    <GoToTop/>
    </>
  )
}

export default Home