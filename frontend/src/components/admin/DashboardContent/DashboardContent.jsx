import React from 'react'
import './DashboardContent.scss'
import DashboardCard from '../DashboardCard/DashboardCard'
import {ResponsiveContainer,BarChart,Bar,XAxis,Tooltip} from 'recharts'

const dummyData=[
  {name:"Sat",mileStats:4000},
  {name:"Sun",mileStats:3000},
  {name:"Mon",mileStats:4200},
  {name:"Tue",mileStats:5600},
  {name:"Wed",mileStats:1890},
]

const DashboardContent = () => {
  return (
    <div className="dashboard">
      <div className="dashboard_warapper">
        <div className="dashboard_cards">
          <DashboardCard title={'Total Cars'} value={30} symbol={<i className="ri-car-fill"></i>} />
          <DashboardCard title={'Booked'} value={10} symbol={<i className="ri-booklet-fill"></i>} />
          <DashboardCard title={'Total Cars'} value={30} symbol={<i className="ri-car-fill"></i>} />
          <DashboardCard title={'Total Cars'} value={30} symbol={<i className="ri-car-fill"></i>} />
        </div>
        <div className="statics">
          <div className="stats">
            <h3>Miles Statics</h3>
            <ResponsiveContainer width={'100%'} aspect={4/1}>
              <BarChart data={dummyData}>
            <XAxis dataKey={'name'} stroke='#000' />
            <Bar dataKey={'mileStats'} stroke={'rgba(94, 80, 63, 0.81)'} fill={'rgba(94, 80, 63, 0.81)'} barSize={30} />
            <Tooltip cursor={false} wrapperClassName='toolTip_style' />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default DashboardContent