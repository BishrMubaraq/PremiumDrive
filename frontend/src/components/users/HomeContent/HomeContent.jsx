import React from 'react'
import './HomeContent.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import CarCard from '../CarCard/CarCard'

const HomeContent = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit=(data)=>{
    console.log(data);
  }
  return (
    <div className="landing_page_wrapper">
      <div className="hero_section">
        <div className="hero_text">
          <h1>Drive of your Life.</h1>
          <p>Search and find your best car rental with easy way</p>
          <a href='#booking'>
            <button className='hero_btn'>Booking Now</button>
          </a>
        </div>
      </div>
      <div id='booking' className="search_section">
        <div className="search_wrapper">
          <div className="search">
            <h1>RENT A SELF DRIVE CAR</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="">Pickup City</label>
                <select className={errors.pickupCity?'normalInput errorInput':'normalInput'} name="pickupCity" {...register('pickupCity',{required:'Please select pickup city'})} >
                  <optgroup>
                    <option hidden value="">Select City</option>
                    <option value="Calicut">Calicut</option>
                    <option value="Kochi">Kochi</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label htmlFor="">Dropoff City</label>
                <select className={errors.dropoffCity?'normalInput errorInput':'normalInput'} name="dropoffCity" {...register('dropoffCity',{required:'Please select dropoff city'})}>
                  <optgroup>
                    <option hidden value="">Select City</option>
                    <option value="Calicut">Calicut</option>
                    <option value="Kochi">Kochi</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label htmlFor="">Pickup Date</label>
                <input className={errors.pickupDate?'normalInput errorInput':'normalInput'} type="date" name='pickupDate' {...register('pickupDate',{required:'Please select pickup date'})} />
              </div>
              <div>
                <label htmlFor="">Dropoff Date</label>
                <input className={errors.dropoffDate?'normalInput errorInput':'normalInput'} type="date" name='dropoffDate' {...register('dropoffDate',{required:'Please select dropoff date'})} />
              </div>

              <button type='submit'><i className="ri-search-line"></i></button>
            </form>
          </div>
        </div>
      </div>
      <div className="car_fleets">
        <div className="fleet_title">
          <h3>Our Fleets</h3>
        </div>
        <div className="category_chips">
          <ul className='category_chips_list'>
            <li><NavLink className={'chip chip_active'}>All</NavLink></li>
            <li><NavLink className={'chip'}>Sedan</NavLink></li>
            <li><NavLink className={'chip'}>Hatchback</NavLink></li>
            <li><NavLink className={'chip'}>SUV</NavLink></li>
            <li><NavLink className={'chip'}>MPV</NavLink></li>
            <li><NavLink className={'chip'}>Lifestyle Truck</NavLink></li>
          </ul>
        </div>
        <div className="car_cards">
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
        </div>
        <button onClick={() => navigate('/cars')} className='view_more'>View More</button>
      </div>
    </div>
  )
}

export default HomeContent