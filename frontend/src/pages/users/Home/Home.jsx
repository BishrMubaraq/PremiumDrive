import React from 'react'
import HomeContent from '../../../components/users/HomeContent/HomeContent'
import Layout from '../../../components/users/Layout/Layout'


const Home = () => {
  return (
    <>
    <Layout children={<HomeContent/>} />
    </>
  )
}

export default Home