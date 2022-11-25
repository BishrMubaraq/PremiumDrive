import React from 'react'
import AdminLayout from '../../../components/admin/Layout/Layout'
import ChatContent from '../../../components/users/ChatContent/ChatContent'
import { useSelector } from 'react-redux'


const ChatBox = () => {
  const { admin } = useSelector((state) => state.adminAuth)
  return (
    <AdminLayout children={<ChatContent currentUser={admin}/>}/>
  )
}

export default ChatBox