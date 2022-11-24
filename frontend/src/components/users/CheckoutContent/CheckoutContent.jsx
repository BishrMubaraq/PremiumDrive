import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout';
import { useSelector, useDispatch } from 'react-redux'
import { bookingPayment, bookingReset } from '../../../redux/features/users/booking/bookingSlice';
import moment from 'moment';
import { toast } from 'react-toastify'
import './CheckoutContent.scss'

const CheckoutContent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { bookingIsLoading, bookingMessage, bookingIsSuccess, bookingIsError, bookingError } = useSelector((state) => state.booking)

  const allData = useLocation()
  useEffect(() => {
    if (bookingIsError) {
      toast.error(bookingError)
    }
    if (bookingIsSuccess) {
      toast.success(bookingMessage.message)
      navigate('/')
    }
    dispatch(bookingReset())
  }, [bookingIsError, bookingIsSuccess, bookingError, bookingMessage])
  function onToken(data) {
    let checkOutData = {
      bookingId: bookingData._id,
      totalAmount: bookingData.totalAmount,
      token: data
    }
    dispatch(bookingPayment(checkOutData))
  }
  if (allData.state === null) {
    return (
      <div className='no_checkout_page_container'>
        <div className='no_checkout_page_wrapper'>
          <p>No Cars booked for Checkout!!</p>
        </div>

      </div>
    )
  }
  const bookingData = allData.state.bookingMessage
  const carData = allData.state.car
  const bookedSlots = bookingData.bookedSlots
  const from = bookedSlots.from
  const to = bookedSlots.to
  return (
    <div className='checkout_page_container'>
      <div className="checkout_page_wrapper">

        <h1>
          Checkout
        </h1>
        <div className='checkout_content'>
          <img src={carData.image?.url} alt="" />
          <h3>{carData.name}</h3>
          <h3>{carData.rent}/hour</h3>
          <hr />
          <h5><span className='from'>{moment(from).format('MMM DD yyy hh:mm')} </span> to <span className='to'>{moment(to).format('MMM DD yyy hh:mm')}</span></h5>
          <h5 className='hour'>{bookingData.totalHours} hours</h5>
          <h5 className='inline'><span className='label'> Dropoff City </span> <span className='result'> {bookingData.dropoffCity}</span></h5>
          <hr />
          <h5 className='inline payD'><span className='label'> Rent </span> <span className='result'> {(Number.parseInt(carData.rent)) * Number.parseInt(bookingData.totalHours)}</span></h5>
          <h5 className='inline payD'><span className='label'> Driver </span> <span className='result'> {bookingData.driverRequire ? (Number.parseInt(bookingData.totalHours) * 100) : '0'}</span></h5>
          <h5 className='inline payD'><span className='label'> Total </span> <span className='result'> {bookingData.totalAmount}</span></h5>
          <hr />
        </div>
        <StripeCheckout
          shippingAddress
          token={onToken}
          amount={bookingData.totalAmount * 100}
          currency='INR'
          stripeKey={'pk_test_51M5R0ySBtCPIDeQ8xRoWerThgbmDZsnOqBjCmpd6LudlOU4dXTvKfVWCDXiY1wiZy14jL51m05zHXf5Ux1Vrmauw003anZKes3'}
        >
          <button>Pay Now</button>
        </StripeCheckout>
      </div>
    </div>
  )
}

export default CheckoutContent