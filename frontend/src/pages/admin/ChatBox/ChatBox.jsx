import React from 'react'
import AdminLayout from '../../../components/admin/Layout/Layout'
import ChatContent from '../../../components/users/ChatContent/ChatContent'


const ChatBox = () => {
  return (
    <AdminLayout children={<ChatContent/>}/>
  )
}

export default ChatBox