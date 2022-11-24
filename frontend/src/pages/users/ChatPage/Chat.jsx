import React from 'react'
import ChatContent from '../../../components/users/ChatContent/ChatContent'
import Layout from '../../../components/users/Layout/Layout'
import GoToTop from '../../../utils/GoToTop'


const Chat = () => {
  return (
    <>
    <Layout children={<ChatContent/>} />
    <GoToTop/>
    </>
  )
}

export default Chat