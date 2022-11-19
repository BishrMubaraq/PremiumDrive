import axios from "axios";

const API_USERS_BOOKCAR = 'http://localhost:5000/api/users/bookCar'
const API_USERS_PAYCAR = 'http://localhost:5000/api/users/payment'

// Book car
const bookCar = async (bookingData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_USERS_BOOKCAR, bookingData, config)
    return response.data
}

// Pay car
const payCar = async (checkoutData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_USERS_PAYCAR, checkoutData, config)
    return response.data
}

const bookingService = {
    bookCar, payCar
}

export default bookingService