import axios from 'axios'

const API_URL_LOGIN = 'http://localhost:5000/api/admin/login/'

// Login Admin
const login = async (adminData) => {
    const response = await axios.post(API_URL_LOGIN, adminData)

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