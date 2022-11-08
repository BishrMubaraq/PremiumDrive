import React from 'react'
import './CarCard.scss'


const CarCard = ({name,rent,image,id}) => {
    return (
        <div className="single_car_card">
            <div className="top_section">
                <img src={image} alt="" />
            </div>
            <div className="bottom_section">
                <div className="details_sec">
                    <h4>{name}</h4>
                    <h6>{rent}/Day</h6>
                </div>
                <div className="btn_sec">
                    <button>Book Now</button>
                </div>
            </div>
        </div>
    )
}

export default CarCard