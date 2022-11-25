import React from 'react'
import ChatContent from '../../../components/users/ChatContent/ChatContent'
import Layout from '../../../components/users/Layout/Layout'
import GoToTop from '../../../utils/GoToTop'
import { useSelector } from 'react-redux'


const Chat = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <>
    <Layout children={<ChatContent currentUser={user}/>} />
    <GoToTop/>
    </>
  )
}

export default Chat