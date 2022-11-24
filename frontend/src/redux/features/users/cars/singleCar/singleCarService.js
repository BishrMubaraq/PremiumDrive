import axiosInstance from "../../../../../utils/axiosInstance";

const API_URL_GETCAR='users/car'

// Get car
const getCar = async(id)=>{
    const response = await axiosInstance.get(`${API_URL_GETCAR}?id=${id}`)

    return response.data
}

const singleCarService={
    getCar
}

export default singleCarService