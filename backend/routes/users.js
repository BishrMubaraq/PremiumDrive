const express = require('express')
const {
    registerUser,
    loginUser,
    getUserDetails,
    otpVerification
} = require('../controllers/usersController')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/otp', otpVerification)
router.get('/me', protect, getUserDetails)


module.exports = router