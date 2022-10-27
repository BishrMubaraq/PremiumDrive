import React,{useEffect} from 'react'
import AdminLayout from '../../../components/admin/Layout/Layout'
import DashboardContent from '../../../components/admin/DashboardContent/DashboardContent'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {

  const {admin}=useSelector((state)=>state.adminAuth)
  const navigate=useNavigate()
  useEffect(()=>{
    if(!admin){
      navigate('/admin/login')
    }
  },[admin,navigate])
  return (
    <>
    <AdminLayout children={<DashboardContent/>} />
    </>
  )
}

export default Dashboard