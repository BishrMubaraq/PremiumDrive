import axios from 'axios'

const API_URL_ADDPLACE = 'http://localhost:5000/api/admin/addPlace'
const API_URL_PLACES = 'http://localhost:5000/api/admin/getPlaces'
const API_URL_DELETE_PLACE = 'http://localhost:5000/api/admin/deletePlace'

// add place
const addPlace = async (place, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL_ADDPLACE, place, config)

    return response.data
}

// get places
const getPlaces=async(token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(API_URL_PLACES,config)
    return response.data
}
// delete place
const deletePlace=async(id,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.delete(`${API_URL_DELETE_PLACE}?id=${id}`,config)
    return response.data
}

const placeService={
    addPlace,
    getPlaces,
    deletePlace
}

export default placeService