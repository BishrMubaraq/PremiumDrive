import axios from 'axios'

const API_URL_ADDCAR = 'http://localhost:5000/api/admin/addCars'
const API_URL_CARS = 'http://localhost:5000/api/admin/cars'
const API_URL_DELETE_CAR = 'http://localhost:5000/api/admin/deleteCar'

// add car
const addCar = async (carData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL_ADDCAR, carData, config)

    return response.data
}

// get cars
const cars = async(token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL_CARS, config)

    return response.data
}

// Delete car
const deleteCar=async(id,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response=await axios.patch(`${API_URL_DELETE_CAR}?id=${id}`,config)
    return response.data
}

const carService = {
    addCar,cars,deleteCar
}

export default carService