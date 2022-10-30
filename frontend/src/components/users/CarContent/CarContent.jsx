import React from 'react'
import CarCard from '../CarCard/CarCard'
import './CarContent.scss'

const CarContent = () => {
  return (
    <div className="cars_wrapper1">

    <div className="car_fleets1">
        <div className="fleet_title1">
          <h3>Our Fleets</h3>
        </div>
        <div className="filter_sec">
            <div className="filter_wrapper">
                <div className="search">
                    <input type={'search'} placeholder='Search' />
                    <span><i class="ri-search-line"></i></span>
                </div>
                <span className='filter_span'><i className='filter_btn ri-filter-3-fill'></i></span>
            </div>
        </div>
        <div className="car_cards1">
          <CarCard />
        </div>
      </div>
              
    </div>
  )
}

export default CarContent