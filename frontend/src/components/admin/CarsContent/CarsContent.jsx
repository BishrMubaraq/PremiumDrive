import React, { useState } from 'react'
import AddCar from '../AddCar/AddCar'
import './CarsContent.scss'



const CarsContent = () => {

  const [addCarModal, setAddCarModal] = useState(false)
  const [addUpdateModal, setUpdateCarModal] = useState(false)

  return (
    <div className='cars'>
      <h3>All Cars</h3>
      <div className="add_btn_wrapper">
        <button onClick={()=>{
          setAddCarModal(!addCarModal)
        }}>Add Car</button>
      </div>
      {
        addCarModal ? <AddCar type={'Add'} stateChange={setAddCarModal} /> : null
      }
      {
        addUpdateModal ? <AddCar type={'Update'} stateChange={setUpdateCarModal} /> : null
      }

      <div className="car_wrapper">
        <div className="car_card">
          <div className="card_left">
            <img className='card_img' src="https://c.ndtvimg.com/range-rover-sport_625x300_1530181391799.jpg" alt="" />
          </div>
          <div className="card_right">
            <div className="main_details">
              <h4>Range Rover</h4>
              <p>7000/day</p>
              <span>Available</span>
            </div>
            <div className="sub_details">
              <p>Type : SUV</p>
              <p>Place : Calicut</p>
              <p>Transmission : Auto</p>
              <p>Fuel : Petrol</p>
              <p>Brand : Land Rover</p>
              <p>Registration : Kl-10-1234</p>
            </div>
            <div className="card_actions">
              <h2 onClick={()=>setUpdateCarModal(true)}><i className="ri-pencil-fill"></i></h2>
              <h2><i className="ri-delete-bin-fill"></i></h2>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CarsContent