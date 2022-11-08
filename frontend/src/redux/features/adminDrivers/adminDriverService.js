import axios from "axios";

const API_URL_GETDRIVERS = 'http://localhost:5000/api/admin/drivers'
const API_URL_BLOCK_UNBLOCK = 'http://localhost:5000/api/admin/blockAndUnblockDriver'
const API_URL_APPROVE = 'http://localhost:5000/api/admin/approveDriver'
const API_URL_DECLINE = 'http://localhost:5000/api/admin/declineDriver'

// Get Drivers
const getDrivers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL_GETDRIVERS, config)

    return response.data
}

// Approve Driver
const approveDriver=async(id,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL_APPROVE,{id:id},config)
    return response.data
}

// Decline Driver
const declineDriver=async(id,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL_DECLINE,{id:id},config)
    return response.data
}

// Block and unblock driver
const blockAndUnblockDriver=async(id,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL_BLOCK_UNBLOCK,{id:id},config)
    return response.data
}

const adminDriverService={
    getDrivers,
    approveDriver,
    declineDriver,
    blockAndUnblockDriver
}

export default adminDriverService