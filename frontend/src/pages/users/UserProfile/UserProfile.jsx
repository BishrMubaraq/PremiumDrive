import React from 'react'
import GoToTop from '../../../utils/GoToTop'
import Layout from '../../../components/users/Layout/Layout'
import UserProfileContent from '../../../components/users/UserProfileContent/UserProfileContent'

const UserProfile = () => {
  return (
    <>
    <Layout children={<UserProfileContent/>} />
    <GoToTop/>
    </>
  )
}

export default UserProfile