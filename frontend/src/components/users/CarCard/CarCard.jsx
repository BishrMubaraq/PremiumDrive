import React from 'react'
import './CarCard.scss'
import Car from '../../../assets/HeroImg.jpg'

const CarCard = () => {
    return (
        <div className="single_car_card">
            <div className="top_section">
                <img src={Car} alt="" />
            </div>
            <div className="bottom_section">
                <div className="details_sec">
                    <h4>Ford Raptor</h4>
                    <h6>6000/Day</h6>
                </div>
                <div className="btn_sec">
                    <button>Book Now</button>
                </div>
            </div>
        </div>
    )
}

export default CarCard