import React from 'react'
import './DashboardCard.scss'


const DashboardCard = ({title,value,symbol}) => {
    return (
        <div className="single_card">
            <div className="card_content">
                <h4>{title}</h4>
                <span>{value}</span>
            </div>
            <span>{symbol}</span>
        </div>
    )
}

export default DashboardCard