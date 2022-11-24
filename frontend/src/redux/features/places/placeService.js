import axiosInstance from "../../../utils/axiosInstance"

const API_URL_ADDPLACE = 'admin/addPlace'
const API_URL_PLACES = 'admin/getPlaces'
const API_URL_DELETE_PLACE = 'admin/deletePlace'

// add place
const addPlace = async (place, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.post(API_URL_ADDPLACE, place, config)

    return response.data
}

// get places
const getPlaces=async()=>{
    const response=await axiosInstance.get(API_URL_PLACES)
    return response.data
}
// delete place
const deletePlace=async(id,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axiosInstance.delete(`${API_URL_DELETE_PLACE}?id=${id}`,config)
    return response.data
}

const placeService={
    addPlace,
    getPlaces,
    deletePlace
}

export default placeService