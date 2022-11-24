import axiosInstance from "../../../utils/axiosInstance"


const API_URL_ADDBRAND = 'admin/addBrand'
const API_URL_BRANDS = 'admin/getBrands'
const API_URL_DELETE_BRAND = 'admin/deleteBrand'

// add brand
const addBrand = async (brand, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.post(API_URL_ADDBRAND, brand, config)

    return response.data
}

// get brands
const getBrands=async()=>{
   
    const response=await axiosInstance.get(API_URL_BRANDS,)
    return response.data
}
// delete brand
const deleteBrand=async(id,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axiosInstance.delete(`${API_URL_DELETE_BRAND}?id=${id}`,config)
    return response.data
}

const brandService={
    addBrand,
    getBrands,
    deleteBrand
}

export default brandService