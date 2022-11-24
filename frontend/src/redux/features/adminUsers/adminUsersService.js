import axiosInstance from "../../../utils/axiosInstance"

const API_URL_GETUSERS = 'admin/users'
const API_URL_BLOCK_UNBLOCK = 'admin/blockAndUnblockUser'

// Get Users
const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.get(API_URL_GETUSERS, config)

    return response.data
}
const blockAndUnblock = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.patch(`${API_URL_BLOCK_UNBLOCK}?id=${id}`, config)

    return response.data
}

const adminUsersService = {
    getUsers, blockAndUnblock
}
export default adminUsersService