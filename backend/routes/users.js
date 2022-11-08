const express = require('express')
const {
    registerUser,
    loginUser,
    getUserDetails,
    otpVerification,
    getCars
} = require('../controllers/usersController')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/otp', otpVerification)
router.get('/cars', getCars)
router.get('/cars', protect, getUserDetails)


module.exports = router