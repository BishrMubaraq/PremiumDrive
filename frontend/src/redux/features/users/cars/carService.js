import axiosInstance from "../../../../utils/axiosInstance"

const API_USERS_CARS='users/cars'

// Get cars
const getCars = async()=>{
    const response = await axiosInstance.get(API_USERS_CARS)

    return response.data
}

const carService={
    getCars
}

export default carService