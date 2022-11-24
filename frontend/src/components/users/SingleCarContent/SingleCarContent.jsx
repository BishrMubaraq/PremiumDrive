import React, { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import './SingleCarContent.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, getCar } from '../../../redux/features/users/cars/singleCar/singleCarSlice'
import { getPlaces, placeReset } from '../../../redux/features/places/placeSlice'
import { bookCar, bookingReset } from '../../../redux/features/users/booking/bookingSlice'
import { toast } from 'react-toastify'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import BookedSlots from '../BookedSlots/BookedSlots';

const SingleCarContent = () => {
  const [dropOffCity, setDropOffCity] = useState()
  const [dropOffDate, setDropOffDate] = useState()
  const [pickUpDate, setPickUpDate] = useState();
  const [showBookedSlots, setShowBookedSlots] = useState(false);
  const [totalDays, setTotalDays] = useState(0)
  const [driver, setDriver] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const { state } = useLocation()
  const dispatch = useDispatch()
  const bookDispatch = useDispatch()
  const navigate = useNavigate()
  const { car, isLoading, isSuccess, isError, error } = useSelector((state) => state.singleCar)
  const { bookingIsLoading, bookingMessage, bookingIsSuccess, bookingIsError, bookingError } = useSelector((state) => state.booking)
  const { places } = useSelector((state) => state.places)

  let bookedSlots = car?.bookedSlots

  useEffect(() => {
    dispatch(getCar(state.id))
    dispatch(getPlaces())

    return () => {
      dispatch(reset())
      dispatch(placeReset())
      dispatch(bookingReset())
    }
  }, [])

  useEffect(() => {
    if (dropOffDate) {
      setTotalDays(moment(dropOffDate).diff(moment(pickUpDate), 'hours'))
    }
    if (totalDays) {
      if (pickUpDate < dropOffDate) {
        if (driver) {
          setTotalAmount(Number.parseFloat(car.rent) * Number.parseInt(totalDays) + (Number.parseInt(totalDays) * 100))
        } else {
          setTotalAmount(Number.parseFloat(car.rent) * Number.parseInt(totalDays))
        }
      } else {
        setTotalAmount(0)
      }
    }

  }, [dropOffDate, totalDays, driver, pickUpDate])

  useEffect(() => {
    if (bookingIsError) {
      toast.error(bookingError)
    }
    if (bookingIsSuccess) {
      navigate("/checkout", { state: {bookingMessage,car:car} })
    }
    dispatch(bookingReset())
  }, [bookingIsError, bookingIsSuccess, bookingError, navigate])

  function onSubmit(e) {
    e.preventDefault()
    if (!dropOffCity || !pickUpDate || !dropOffDate) {

      if (!dropOffCity) {
        toast.error('Please add Droppoff City')
      }
      if (!pickUpDate && !dropOffDate) {
        toast.error('Please add Date')
      }
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (!user) {
        navigate('/login')
      } else {
        const reqObj = {
          user: user._id,
          car: car._id,
          totalAmount,
          totalDays,
          pickUpDate,
          dropOffDate,
          dropOffCity,
          driverRequire: driver
        }
        if (totalDays >= 1) {
          bookDispatch(bookCar(reqObj))
        } else {
          toast.error('Book car atleast for 1 hour')
        }
      }
    }
  }

  return (
    <>
      <div className="single_car_container">
        <div className="single_car_wrapper">
          <div className="single_car_top_sec">
            <div className="img_sec">

              <img src={car.image?.url}
                alt="" className="single_car_img" />

            </div>
            <div className="single_car_details_sec">
              <div className="name_sec">
                <h1>{car.name}</h1>
                <h4>₹	{car.rent}/hour</h4>
              </div>

              <div className="fetures_sec_wrapper">
                <div className="feture_title">
                  <h3>Car Details</h3>
                </div>
                <div className="fetures">
                  <div className="feture">
                    <span className='label'><p>Available Place</p></span><span><p>{car.place}</p></span>
                  </div>
                  <div className="feture">
                    <span className='label'><p>Body Type</p></span><span><p>{car.body}</p></span>
                  </div>
                  <div className="feture">
                    <span className='label'><p>Brand</p></span><span><p>{car.brand}</p></span>
                  </div>
                  <div className="feture">
                    <span className='label'><p>Transmission</p></span><span><p>{car.transmission}</p></span>
                  </div>
                  <div className="feture">
                    <span className='label'><p>Fuel</p></span><span><p>{car.fuel}</p></span>
                  </div>
                  <div className="feture">
                    <span className='label'><p>Registration No</p></span><span><p>{car.registrationNo}</p></span>
                  </div>
                </div>
              </div>
              <div className="booking_sec_wrapper">
                <div className="booking_title">
                  <h3>Booking Details</h3>
                </div>
                <form onSubmit={onSubmit} className="booking">

                  <div className="booking_field">
                    <label htmlFor="">Dropoff City</label>
                    <select onChange={(e) => setDropOffCity(e.target.value)} >
                      <option value="" hidden>Select City</option>
                      {
                        places.map((place) => (
                          <option key={place._id} value={place.place}>{place.place}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="booking_field">
                    <label htmlFor="">Pickup Date</label>
                    <DatePicker
                      selected={pickUpDate}
                      minDate={Date.now()}
                      showTimeSelect
                      timeIntervals={60}
                      dateFormat="MMM d, yyyy h:mm aa"
                      onChange={(date) => { setPickUpDate(date) }}
                      placeholderText="Select Pickup date" />
                  </div>
                  <div className="booking_field">
                    <label htmlFor="">Dropoff Date</label>
                    <DatePicker selected={dropOffDate}
                      minDate={Date.now()}
                      showTimeSelect timeIntervals={60}
                      dateFormat="MMM d, yyyy h:mm aa"
                      onChange={(date) => { setDropOffDate(date) }}
                      placeholderText="Select Dropoff date" />
                  </div>
                  <div className="booking_field_driver">
                    <div onClick={() => setShowBookedSlots(true)} className='booked_slots'>Booked Slots</div>
                    {showBookedSlots && <BookedSlots stateChange={setShowBookedSlots} data={bookedSlots} />}
                  </div>
                  <div className="booking_field_driver">
                    <input onChange={(e) => {
                      if (e.target.checked) {
                        setDriver(true)
                      } else {
                        setDriver(false)
                      }
                    }} type="checkbox" />
                    <label htmlFor="">Driver required</label>
                  </div>
                  <div className="booking_field">
                    <p>Total hours : {totalDays >= 1 ? totalDays : 0}</p>
                    <h1>Total : ₹ {totalAmount}</h1>
                  </div>
                  <div className="booking_field">
                    <button className='submitBtn' type='submit'>Book Now</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default SingleCarContent