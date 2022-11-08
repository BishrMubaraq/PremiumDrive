import axios from "axios";

const API_USERS_CARS='http://localhost:5000/api/users/cars'

// Get cars
const getCars = async()=>{
    const response = await axios.get(API_USERS_CARS)

    return response.data
}

const carService={
    getCars
}

export default carService