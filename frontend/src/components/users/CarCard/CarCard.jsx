import React from 'react'
import './CarCard.scss'
import { useNavigate } from 'react-router-dom'


const CarCard = ({name,rent,image,id,place}) => {

    const navigate=useNavigate()
    return (
        <div onClick={()=>navigate(`/car`,{state:{id:id}})} className="single_car_card">
            <div className="top_section">
                <img src={image} alt="" />
            </div>
            <div className="bottom_section">
                <div className="details_sec">
                    <h4>{name}</h4>
                    <h6>₹ {rent}/Day</h6>
                    <p>{place}</p>
                </div>
                <div className="btn_sec">
                    <button>Book Now</button>
                </div>
            </div>
        </div>
    )
}

export default CarCard