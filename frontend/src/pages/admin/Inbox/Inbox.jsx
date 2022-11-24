import React from 'react'
import InboxList from '../../../components/admin/InboxContent/InboxContent'
import AdminLayout from '../../../components/admin/Layout/Layout'


const Inbox = () => {
  return (
    <AdminLayout children={<InboxList/>}/>
  )
}

export default Inbox