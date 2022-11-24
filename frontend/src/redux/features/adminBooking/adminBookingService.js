import axiosInstance from "../../../utils/axiosInstance"

const GETBOOKINGS = 'admin/getBookings'


// Get Drivers
const getBookings = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.get(GETBOOKINGS, config)

    return response.data
}


const adminBookingService={
    getBookings,
   
}

export default adminBookingService