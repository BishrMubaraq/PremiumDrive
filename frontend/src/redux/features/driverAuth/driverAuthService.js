import axiosInstance from "../../../utils/axiosInstance"

const API_URL_REGISTER = 'driver/register/'
const API_URL_LOGIN = 'driver/login/'

// register driver
const register = async (driverData) => {
    const response = await axiosInstance.post(API_URL_REGISTER, driverData)

    return response.data
}
// login driver
const login = async (loginData) => {
    const response = await axiosInstance.post(API_URL_LOGIN, loginData)
    if (response.data) {
        localStorage.setItem('driver', JSON.stringify(response.data))
    }
    return response.data
}

const driverAuthService={
    register,
    login
}
export default driverAuthService