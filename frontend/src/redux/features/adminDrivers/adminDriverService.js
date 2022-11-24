import axiosInstance from "../../../utils/axiosInstance"

const API_URL_GETDRIVERS = 'admin/drivers'
const API_URL_BLOCK_UNBLOCK = 'admin/blockAndUnblockDriver'
const API_URL_APPROVE = 'admin/approveDriver'
const API_URL_DECLINE = 'admin/declineDriver'

// Get Drivers
const getDrivers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.get(API_URL_GETDRIVERS, config)

    return response.data
}

// Approve Driver
const approveDriver=async(id,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.put(API_URL_APPROVE,{id:id},config)
    return response.data
}

// Decline Driver
const declineDriver=async(id,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.put(API_URL_DECLINE,{id:id},config)
    return response.data
}

// Block and unblock driver
const blockAndUnblockDriver=async(id,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.put(API_URL_BLOCK_UNBLOCK,{id:id},config)
    return response.data
}

const adminDriverService={
    getDrivers,
    approveDriver,
    declineDriver,
    blockAndUnblockDriver
}

export default adminDriverService