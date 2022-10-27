import React,{useEffect} from 'react'
import CarsContent from '../../../components/admin/CarsContent/CarsContent'
import AdminLayout from '../../../components/admin/Layout/Layout'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const Cars = () => {
  const {admin}=useSelector((state)=>state.adminAuth)
  const navigate=useNavigate()
  useEffect(()=>{
    if(!admin){
      navigate('/admin')
    }
  })
  return (
    <>
        <AdminLayout children={<CarsContent/>} />
    </>
  )
}

export default Cars