import axios from "axios";

const API_URL_REGISTER = 'http://localhost:5000/api/driver/register/'
const API_URL_LOGIN = 'http://localhost:5000/api/driver/login/'

// register driver
const register = async (driverData) => {
    const response = await axios.post(API_URL_REGISTER, driverData)

    return response.data
}
// login driver
const login = async (loginData) => {
    const response = await axios.post(API_URL_LOGIN, loginData)
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