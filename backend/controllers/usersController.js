const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel')
const Cars = require('../models/carModel')
const Bookings = require('../models/bookingModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { doSms, verifyOtp } = require('../helpers/otpVerification')
const moment = require('moment')
const Stripe = require('stripe')
const { default: mongoose } = require('mongoose')
const stripe = Stripe('sk_test_51M5R0ySBtCPIDeQ83Qb2SZR15XLhqsNwx0MsrRcjLhfxCO1vYm2zicuIkuIaAFYExiViKS5FOapeZkCJ7A88SHgk00dTxzNwMt')
const Chat = require('../models/chatModel')
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
            const newChat = new Chat({
                members: [`${user._id}`, '634ab5d8cd37fdcbfdcb2803']
            })
            const result = await newChat.save()
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
    if (user?.isBlocked) {
        res.status(400).json({ message: 'Account Blocked' })
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
// @desc Get a car
// @route GET /api/users/car
// @access Public
const getCar = asyncHandler(async (req, res) => {
    const car = await Cars.findById(req.query.id)
    if (car) {
        res.status(200).json(car)
    } else {
        res.status(400)
        throw new Error('Something went wrong!')
    }
})

// @desc Book cars
// @route POST /api/users/bookCar
// @access Private
const bookCar = asyncHandler(async (req, res) => {
    const { user, car, totalAmount, totalDays, pickUpDate, dropOffDate, dropOffCity, driverRequire } = req.body
    if (!user, !car, !totalAmount, !totalDays, !pickUpDate, !dropOffDate, !dropOffCity) {
        res.status(400)
        throw new Error('All fields are required')
    } else {
        const theCar = await Cars.findById(car)
        let selectedFrom = moment(pickUpDate)
        let selectedTo = moment(dropOffDate)

        if (theCar.bookedSlots.length > 0) {
            for (let slot of theCar.bookedSlots) {
                if (selectedFrom.isBetween(moment(slot.from), moment(slot.to), null, '[)') || selectedTo.isBetween(moment(slot.from), moment(slot.to), null, '(]')) {
                    res.status(400)
                    throw new Error('Slot is already reserved')
                }
            }
        }
        theCar.bookedSlots.push({ from: pickUpDate, to: dropOffDate })
        await theCar.save()
        const bookCar = await Bookings.create({
            user, car, totalAmount, totalHours: totalDays, 'bookedSlots.from': pickUpDate, 'bookedSlots.to': dropOffDate, dropoffCity: dropOffCity, driverRequire, transactionId: 'pending'
        })
        if (bookCar && theCar) {
            res.status(201).json(bookCar)
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})


// @desc Get user bookings
// @route GET /api/users/myBookings
// @access Private
const myBookings = asyncHandler(async (req, res) => {
    const id = req.query.id
    if (!id) {
        res.status(400)
        throw new Error('User is not found')
    }
    const userBookings = await Bookings.aggregate([
        {
            $match: { user: mongoose.Types.ObjectId(id) }
        },
        {
            $lookup: {
                from: 'cars',
                localField: 'car',
                foreignField: '_id',
                as: 'carData'
            }
        },
        { $sort: { createdAt: -1 } }
    ])
    res.json(userBookings)
})

// @desc Payment of booked car
// @route POST /api/users/payment
// @access Private
const payment = asyncHandler(async (req, res) => {
    const { token, totalAmount, bookingId } = req.body
    // const customer = await stripe.customers.create({
    //     email: token.email,
    //     source: token.id
    // })
    // const payment = await stripe.charges.create({
    //     amount: totalAmount * 100,
    //     currency: 'inr',
    //     customer: customer.id,
    //     receipt_email: token.email
    // }, {
    //     idempotencyKey: bookingId
    // })

    const updateBookStatus = await Bookings.findByIdAndUpdate({ _id: bookingId }, { transactionId: bookingId, status: 'booked', 'shippingAddress.name': token.card.name, 'shippingAddress.email': token.email, 'shippingAddress.address': token.card.address_line1, 'shippingAddress.city': token.card.address_city, 'shippingAddress.pincode': token.card.address_zip, })
    if (updateBookStatus) {
        res.status(200).json({ message: "Booking completed successfully" })
    } else {
        res.status(400)
        throw new Error('Something went wrong')
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
    getCars,
    getCar,
    bookCar,
    payment,
    myBookings
}