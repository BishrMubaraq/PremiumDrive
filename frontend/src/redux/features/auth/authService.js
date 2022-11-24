import axiosInstance from "../../../utils/axiosInstance"


const API_URL_REGISTER = 'users/register/'
const API_URL_LOGIN = 'users/login/'
const API_URL_OTP = 'users/otp'

// Register user
const register = async (userData) => {
    const response = await axiosInstance.post(API_URL_REGISTER, userData)

    if (response.data) {
        localStorage.setItem('userData', JSON.stringify(userData))
    }

    return response.data
}

// Otp Verification
const otp = async (data) => {
    const response = await axiosInstance.post(API_URL_OTP, data)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axiosInstance.post(API_URL_LOGIN, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login,
    otp
}

export default authService