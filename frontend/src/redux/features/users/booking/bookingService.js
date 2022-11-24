import axiosInstance from "../../../../utils/axiosInstance"

const API_USERS_BOOKCAR = 'users/bookCar'
const API_USERS_PAYCAR = 'users/payment'
const API_USERS_BOOKINGS = 'users/myBookings'

// Book car
const bookCar = async (bookingData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.post(API_USERS_BOOKCAR, bookingData, config)
    return response.data
}

// Pay car
const payCar = async (checkoutData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.post(API_USERS_PAYCAR, checkoutData, config)
    return response.data
}

// User Bookings
const userBookings=async(userId,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.get(`${API_USERS_BOOKINGS}?id=${userId}`, config)
    return response.data
}

const bookingService = {
    bookCar, payCar,userBookings
}

export default bookingService