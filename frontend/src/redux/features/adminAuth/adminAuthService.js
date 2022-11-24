import axiosInstance from "../../../utils/axiosInstance"


const API_URL_LOGIN = 'admin/login/'

// Login Admin
const login = async (adminData) => {
    const response = await axiosInstance.post(API_URL_LOGIN, adminData)

    if (response.data) {
        localStorage.setItem('admin', JSON.stringify(response.data))
    }

    return response.data
}

// Logout Admin
const logout = () => {
    localStorage.removeItem('admin')
}

const adminAuthService = {
    login, logout
}

export default adminAuthService