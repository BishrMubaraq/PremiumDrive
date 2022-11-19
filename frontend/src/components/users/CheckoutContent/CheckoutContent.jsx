import React, { useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout';
import { useSelector, useDispatch } from 'react-redux'
import { bookingPayment, bookingReset } from '../../../redux/features/users/booking/bookingSlice';
import {toast} from 'react-toastify'

const CheckoutContent = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const { bookingIsLoading, bookingMessage, bookingIsSuccess, bookingIsError, bookingError } = useSelector((state) => state.booking)
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
  const bookingData = useLocation()
  function onToken(data) {
    let checkOutData = {
      bookingId: bookingData.state._id,
      totalAmount:bookingData.state.totalAmount,
      token:data
    }
    dispatch(bookingPayment(checkOutData))
  }
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div>

        Checkout
      </div>
      <div>

        totalAmout={bookingData.state.totalAmount}
      </div>
      <StripeCheckout
        shippingAddress
        token={onToken}
        amount={bookingData.state.totalAmount * 100}
        currency='inr'
        stripeKey={'pk_test_51M5R0ySBtCPIDeQ8xRoWerThgbmDZsnOqBjCmpd6LudlOU4dXTvKfVWCDXiY1wiZy14jL51m05zHXf5Ux1Vrmauw003anZKes3'}
      >
        <button>Pay Now</button>
      </StripeCheckout>

    </div>
  )
}

export default CheckoutContent