import axios from "axios";

const API_URL_GETCAR='http://localhost:5000/api/users/car'

// Get car
const getCar = async(id)=>{
    const response = await axios.get(`${API_URL_GETCAR}?id=${id}`)

    return response.data
}

const singleCarService={
    getCar
}

export default singleCarService