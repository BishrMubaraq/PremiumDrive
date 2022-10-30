import React, { useState, useEffect } from 'react'
import AddCar from '../AddCar/AddCar'
import './CarsContent.scss'
import { useDispatch, useSelector } from 'react-redux'
import { reset, getCars,deleteCar } from '../../../redux/features/cars/carSlice'
import { toast } from 'react-toastify'
import Spinner from '../../Spinner/Spinner'


const CarsContent = () => {

  const [addCarModal, setAddCarModal] = useState(false)
 

  const { isLoading, isError, isSuccess, message, cars } = useSelector((state) => state.cars)
  const dispatch = useDispatch()


  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getCars())
    return () => {
      dispatch(reset())
    }

  }, [isError, message, dispatch])

  if (isLoading) {
    return (<><Spinner /></>)
  }

  return (
    <div className='cars'>
      <h3>All Cars</h3>
      <div className="add_btn_wrapper">
        <button onClick={() => {
          setAddCarModal(!addCarModal)
        }}>Add Car</button>
      </div>
      {
        addCarModal ? <AddCar type={'Add'} stateChange={setAddCarModal} /> : null
      }

      <div className="car_wrapper">

        {cars.length>0?(<>
        {cars.map((car)=>(
          <div key={car._id} className="car_card">
          <div className="card_left">
            <img className='card_img' src={car.image.url} alt="" />
          </div>
          <div className="card_right">
            <div className="main_details">
              <h4>{car.name}</h4>
              <p>{car.rent}/day</p>
              <span>Available</span>
            </div>
            <div className="sub_details">
              <p>Type : {car.body}</p>
              <p>Place : {car.place}</p>
              <p>Transmission : {car.transmission}</p>
              <p>Fuel : {car.fuel}</p>
              <p>Brand : {car.brand}</p>
              <p>Registration : {car.registrationNo}</p>
            </div>
            <div className="card_actions">
              <h2><i className="ri-pencil-fill"></i></h2>
              <h2 onClick={()=>dispatch(deleteCar(car._id))}><i className="ri-delete-bin-fill"></i></h2>
            </div>
          </div>
        </div>
        ))}
        </>):
        (<><h2>No Cars</h2></>)}
      </div>

    </div>
  )
}

export default CarsContent