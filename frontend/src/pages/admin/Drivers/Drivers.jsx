import React from 'react'
import AdminLayout from '../../../components/admin/Layout/Layout'
import DriversContent from '../../../components/admin/DriversContent/DriversContent'

const Drivers = () => {
  return (
    <>
    <AdminLayout children={<DriversContent/>} />
    </>
  )
}

export default Drivers