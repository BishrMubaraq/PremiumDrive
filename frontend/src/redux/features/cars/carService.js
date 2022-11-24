import axiosInstance from "../../../utils/axiosInstance"

const API_URL_ADDCAR = 'admin/addCars'
const API_URL_CARS = 'admin/cars'
const API_URL_DELETE_CAR = 'admin/deleteCar'

// add car
const addCar = async (carData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.post(API_URL_ADDCAR, carData, config)

    return response.data
}

// get cars
const cars = async(token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.get(API_URL_CARS, config)

    return response.data
}

// Delete car
const deleteCar=async(id,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response=await axiosInstance.patch(`${API_URL_DELETE_CAR}?id=${id}`,config)
    return response.data
}

const carService = {
    addCar,cars,deleteCar
}

export default carService