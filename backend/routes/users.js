const express = require('express')
const {
    registerUser,
    loginUser,
    getUserDetails,
    otpVerification,
    getCars,
    getCar,
    bookCar,
    payment
} = require('../controllers/usersController')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/otp', otpVerification)
router.get('/cars', getCars)
router.get('/car', getCar)
router.post('/bookCar', bookCar)
router.post('/payment', payment)
router.get('/me', protect, getUserDetails)


module.exports = router