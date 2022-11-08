const asyncHandler = require('express-async-handler')
const Driver = require('../models/driverModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cloudinary = require('../utils/cloudinary')

// @desc Register driver
// @route POST /api/driver/register
// @access Public
const registerDriver = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, password, profilePic, drivingLicenceFront, drivingLicenceRear } = req.body


    if (!name, !email, !phoneNumber, !password, !profilePic, !drivingLicenceFront, !drivingLicenceRear) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if driver exists
    const driverExists = await Driver.findOne({ email: email })

    if (driverExists) {
        res.status(400)
        throw new Error('Driver already exists')
    } else {

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const profileImg = await cloudinary.uploader.upload(profilePic, {
            folder: 'profilePic',
        })
        const licenceFront = await cloudinary.uploader.upload(drivingLicenceFront, {
            folder: 'drivingLicence'
        })
        const licenceRear = await cloudinary.uploader.upload(drivingLicenceRear, {
            folder: 'drivingLicence'
        })

        const driver = await Driver.create({
            name, email, phoneNumber,
            password: hashedPassword,
            profilePhoto: {
                public_id: profileImg.public_id,
                url: profileImg.secure_url
            },
            drivingLicenceFront: {
                public_id: licenceFront.public_id,
                url: licenceFront.secure_url
            },
            drivingLicenceRear: {
                public_id: licenceRear.public_id,
                url: licenceRear.secure_url
            },
        })

        if (driver) {
            res.status(201).json({
                message: 'Your account is waiting for our administrator approval, Please check back later.'
            })
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }


})

// @desc Login driver
// @route POST /api/driver/login
// @access Public
const loginDriver = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Please fill all fields')
    }

    // check driver
    const driver = await Driver.findOne({ email: email })

    if(!driver){
        res.status(400)
        throw new Error('Invalid credentials')
    }

    if (driver.isBlocked) {
        res.status(400)
        throw new Error('Account blocked')
    }
    if (!driver.isApproved) {
        res.status(400)
        throw new Error('Your account is waiting for our administrator approval, Please check back later.')
    }

    if (driver && (await bcrypt.compare(password, driver.password)) && !driver.isBlocked && driver.isApproved) {
        res.status(200).json({
            _id: driver.id,
            name: driver.name,
            email: driver.email,
            profilePic:driver.profilePhoto.url,
            phoneNumber: driver.phoneNumber,
            token: generateTocken(driver._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//Generate Tocken
const generateTocken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '10d'
    })
}


module.exports = {
    registerDriver,
    loginDriver
}