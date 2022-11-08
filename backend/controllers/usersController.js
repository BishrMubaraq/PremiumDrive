const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel')
const Cars = require('../models/carModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { doSms, verifyOtp } = require('../helpers/otpVerification')

// @desc Register user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, password } = req.body

    if (!name || !email || !phoneNumber || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await Users.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Send OTP

    const otpSend = await doSms(phoneNumber)

    if (otpSend) {
        res.status(200).json(true)
    }
})

// @desc Otp verification and create user
// @route POST /api/users/otp
// @access Public
const otpVerification = asyncHandler(async (req, res) => {
    const { name, email, password, phoneNumber, otp } = req.body

    const optVerify = await verifyOtp(phoneNumber, otp)

    if (optVerify) {
        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create User
        const user = await Users.create({
            name, email, phoneNumber,
            password: hashedPassword
        })

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                token: generateTocken(user._id)
            })
        }
    } else {
        res.status(400)
        throw new Error('Invalid OTP')
    }

})

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await Users.findOne({ email })

    // Check for user status
    if(user.isBlocked){
        res.status(400).json({message:'Account Blocked'})
    }

    if (user && (await bcrypt.compare(password, user.password)) && !user.isBlocked) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: generateTocken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Get user details
// @route GET /api/users/me
// @access Private
const getUserDetails = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber } = await Users.findById(req.user.id)

    res.status(200).json({
        name, email, phoneNumber
    })
})
// @desc Get all cars
// @route GET /api/users/cars
// @access Public
const getCars = asyncHandler(async (req, res) => {
    const cars = await Cars.find({ isDeleted: false }).sort({ createdAt: -1 })
    if (cars) {
        res.status(200).json(cars)
    } else {
        res.status(400)
        throw new Error('Something went wrong!')
    }
})

//Generate Tocken
const generateTocken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '10d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getUserDetails,
    otpVerification,
    getCars
}