import axios from 'axios'

const API_URL_ADDBRAND = 'http://localhost:5000/api/admin/addBrand'
const API_URL_BRANDS = 'http://localhost:5000/api/admin/getBrands'
const API_URL_DELETE_BRAND = 'http://localhost:5000/api/admin/deleteBrand'

// add brand
const addBrand = async (brand, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL_ADDBRAND, brand, config)

    return response.data
}

// get brands
const getBrands=async(token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(API_URL_BRANDS,config)
    return response.data
}
// delete brand
const deleteBrand=async(id,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.delete(`${API_URL_DELETE_BRAND}?id=${id}`,config)
    return response.data
}

const brandService={
    addBrand,
    getBrands,
    deleteBrand
}

export default brandService