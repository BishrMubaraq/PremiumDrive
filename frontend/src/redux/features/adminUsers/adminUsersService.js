import axios from "axios";

const API_URL_GETUSERS = 'http://localhost:5000/api/admin/users'
const API_URL_BLOCK_UNBLOCK = 'http://localhost:5000/api/admin/blockAndUnblockUser'

// Get Users
const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL_GETUSERS, config)

    return response.data
}
const blockAndUnblock = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.patch(`${API_URL_BLOCK_UNBLOCK}?id=${id}`, config)

    return response.data
}

const adminUsersService = {
    getUsers, blockAndUnblock
}
export default adminUsersService