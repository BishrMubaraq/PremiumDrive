const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const Admin = require('../models/adminModel')
const Cars = require('../models/carModel')
const Users = require('../models/userModel')
const Place = require('../models/availablePlaceModel')
const Brand = require('../models/brandModel')
const Drivers = require('../models/driverModel')
const Bookings = require('../models/bookingModel')
const bcrypt = require('bcryptjs')
const cloudinary = require('../utils/cloudinary')

// @desc Admin Login
// @route POST /api/admin/login
// @access Public
const loginAdmin = asyncHandler(async (req, res) => {
    const { adminId, password } = req.body

    if (!adminId || !password) {
        res.status(400)
        throw new Error('Please Enter AdminId and Password')
    }

    // Check Admin ID
    const admin = await Admin.findOne({ adminId })

    if (admin && (await bcrypt.compare(password, admin.password))) {
        res.status(200).json({
            _id: admin._id,
            name: admin.name,
            token: generateTocken(admin.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }


})

// @desc Admin Dashboard
// @route GET /api/admin/
// @access Private
const adminDashboard = asyncHandler(async (req, res) => {
    res.json('Admin Dashboard')
})


// @desc Admin get available places
// @route GET /api/admin/getPlaces
// @access Private
const getPlace = asyncHandler(async (req, res) => {
    const places = await Place.find().sort({ createdAt: -1 })
    res.status(200).json(places)
})


// @desc Admin add available places
// @route POST /api/admin/addPlace
// @access Private
const addPlace = asyncHandler(async (req, res) => {
    const { place } = req.body
    if (!place) {
        throw new Error('Please fill the field')
    }

    const PlaceConvertedToUpperCase = place.toUpperCase()
    const CheckPlace = await Place.findOne({ place: PlaceConvertedToUpperCase })

    if (CheckPlace) {
        throw new Error('Place Already Exist')
    } else {
        const addPlace = await Place.create({ place: PlaceConvertedToUpperCase })

        res.status(201).json({ message: `${PlaceConvertedToUpperCase} addedd successfully` })
    }
})

// @desc Admin delete place
// @route DELETE /api/admin/deleteBrand
// @access Private
const deletePlace = asyncHandler(async (req, res) => {
    if (!req.query.id) {
        res.status(400)
        throw new Error("Place not found")
    }
    const deletePlace = await Place.deleteOne({ _id: req.query.id })

    if (deletePlace) {
        res.status(200).json({ message: `Deleted successfully` })
    } else {
        res.status(400)
        throw new Error('Something went wrong!')
    }
})


// @desc Admin get brands
// @route GET /api/admin/getBrands
// @access Private
const getBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find().sort({ createdAt: -1 })
    res.status(200).json(brands)
})

// @desc Admin add Brands
// @route POST /api/admin/addBrand
// @access Private
const addBrand = asyncHandler(async (req, res) => {
    const { brand } = req.body
    if (!brand) {
        throw new Error('Please fill the field')
    }

    const BrandConvertedToUpperCase = brand.toUpperCase()
    const CheckBrand = await Brand.findOne({ brand: BrandConvertedToUpperCase })

    if (CheckBrand) {
        throw new Error('Brand Already Exist')
    } else {
        const addBrand = await Brand.create({ brand: BrandConvertedToUpperCase })

        res.status(201).json({ message: `${BrandConvertedToUpperCase} addedd successfully` })
    }
})

// @desc Admin delete Brands
// @route DELETE /api/admin/deleteBrand
// @access Private
const deleteBrand = asyncHandler(async (req, res) => {
    if (!req.query.id) {
        res.status(400)
        throw new Error("Brand not found")
    }
    const deleteBrand = await Brand.deleteOne({ _id: req.query.id })

    if (deleteBrand) {
        res.status(200).json({ message: 'Deleted successfully' })
    } else {
        res.status(400)
        throw new Error('Something went wrong!')
    }
})


// @desc Admin Cars
// @route GET /api/admin/cars
// @access Private
const adminCars = asyncHandler(async (req, res) => {
    const cars = await Cars.find({ isDeleted: false }).sort({ createdAt: -1 })
    if (cars) {
        res.status(200).json(cars)
    } else {
        res.status(400)
        throw new Error('Something went wrong!')
    }
})

// @desc Admin add cars
// @route POST /api/admin/addCars
// @access Private
const adminAddCars = asyncHandler(async (req, res) => {
    const {
        name,
        rent,
        place,
        brand,
        transmission,
        fuel,
        body,
        registrationNo,
        image
    } = req.body

    if (!name || !rent || !place || !brand || !transmission || !fuel || !body || !registrationNo || !image) {
        res.status(400)
        throw new Error('Please fill all the fields')
    }
    const imageResult = await cloudinary.uploader.upload(image, {
        folder: 'premiumDrive_Cars',
    })
    const car = await Cars.create({
        name, rent, place, brand, transmission, fuel, body, registrationNo,
        image: {
            public_id: imageResult.public_id,
            url: imageResult.secure_url
        }
    })

    if (car) {
        res.status(201)
        res.json({ message: 'Your car has been successfully added' })
    } else {
        res.status(400)
        throw new Error('Sorry! Something went wrong')
    }


})

// @desc Admin delete car
// @route PUT /api/admin/deleteCar
// @access Private
const adminDeleteCar = asyncHandler(async (req, res) => {
    if (!req.query.id) {
        res.status(400)
        throw new Error("Car not found")
    }
    const deleteCar = await Cars.findByIdAndUpdate(req.query.id, { isDeleted: true })

    const car = await Cars.findOne({ _id: req.query.id })
    if (deleteCar) {
        res.status(200).json({ message: `${car.name} deleted successfully` })
    } else {
        res.status(400)
        throw new Error('Something went wrong!')
    }
})

// @desc Admin edit car
// @route PUT /api/admin/editCar
// @access Private
const adminEditCar = asyncHandler(async (req, res) => {
    const {
        name,
        rent,
        place,
        brand,
        transmission,
        fuel,
        body,
        registrationNo,
        image
    } = req.body

    if (!name || !rent || !place || !brand || !transmission || !fuel || !body || !registrationNo || !image) {
        res.status(400)
        throw new Error('Please fill all the fields')
    }
    if (!req.query.id) {
        res.status(400)
        throw new Error('Car not found')
    }
    const carUpdated = await Cars.findByIdAndUpdate(req.query.id, {
        name, rent, place, brand, transmission, fuel, body, registrationNo, image
    })

    if (carUpdated) {
        res.status(200).json({ message: 'Updated Successfully' })
    } else {
        res.status(400)
        throw new Error('Something went wrong!')
    }



})

// @desc Admin all users
// @route GET /api/admin/users
// @access Private
const adminUsers = asyncHandler(async (req, res) => {
    const users = await Users.find()
    if (users) {
        res.status(200).json(users)
    } else {
        res.status(400)
        throw new Error('Something went wrong')
    }
})
// @desc Admin a users
// @route GET /api/admin/user
// @access Private
const singleUser = asyncHandler(async (req, res) => {
    const user = await Users.findOne({_id:req.query.id})
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(400)
        throw new Error('Something went wrong')
    }
})

// @desc Block and Unblock users
// @route PATCH /api/admin/blockAndUnblockUser
// @access Private
const blockAndUnblockUser = asyncHandler(async (req, res) => {
    if (!req.query.id) {
        res.status(400)
        throw new Error('User not found')
    }
    const user = await Users.findById(req.query.id)
    if (user.isBlocked) {
        const unBlock = await Users.findByIdAndUpdate(req.query.id, {
            isBlocked: false
        })
        if (unBlock) {
            res.status(200).json({ message: `${user.name}'s Account Unblocked` })
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    } else {
        const block = await Users.findByIdAndUpdate(req.query.id, {
            isBlocked: true
        })
        if (block) {
            res.status(200).json({ message: `${user.name}'s Account Blocked` })
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})

// @desc Admin all Bookings
// @route GET /api/admin/getBookings
// @access Private
const adminBookings = asyncHandler(async (req, res) => {
    const bookings = await Bookings.aggregate([
        {
            $lookup: {
                from: 'cars',
                localField: 'car',
                foreignField: '_id',
                as: 'carData'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'userData'
            }
        },
        {
            $unwind: {
                path: '$carData'
            }
        },
        {
            $unwind: {
                path: '$userData'
            }
        },
        {
            $project: {
                car: 0,
                user: 0,
                'userData.password': 0,
                'userData.isBlocked': 0,
                'carData.bookedSlots': 0,
            }
        }, {
            $sort: {
                createdAt: -1
            }
        }
    ])
    if (bookings) {
        res.status(200).json(bookings)
    } else {
        res.status(400)
        throw new Error('Something went wrong')
    }
})

// @desc Admin all drivers
// @route GET /api/admin/drivers
// @access Private
const adminDrivers = asyncHandler(async (req, res) => {
    const drivers = await Drivers.find()
    if (drivers) {
        res.status(200).json(drivers)
    } else {
        res.status(400)
        throw new Error('Something went wrong')
    }
})

// @desc Admin approve drivers
// @route PUT /api/admin/approveDriver
// @access Private
const approveDriver = asyncHandler(async (req, res) => {
    console.log(req.body);
    if (!req.body.id) {
        res.status(400)
        throw new Error('Driver not found')
    }
    const driver = await Drivers.findById(req.body.id)
    const approve = await Drivers.findByIdAndUpdate(req.body.id, {
        isApproved: true
    })
    if (approve) {
        res.status(200).json({ message: `${driver.name}' Account is Approved` })
    } else {
        res.status(400)
        throw new Error('Something went wrong')
    }
})

// @desc Admin decline drivers
// @route PUT /api/admin/declineDriver
// @access Private
const declineDriver = asyncHandler(async (req, res) => {
    if (!req.body.id) {
        res.status(400)
        throw new Error('Driver not found')
    }
    const driver = await Drivers.findById(req.body.id)
    const decline = await Drivers.deleteOne({ _id: req.body.id })
    if (decline) {
        res.status(200).json({ message: `${driver.name}' Account is rejected` })
    } else {
        res.status(400)
        throw new Error('Something went wrong')
    }
})

// @desc Block and Unblock drivers
// @route PUT /api/admin/blockAndUnblockDriver
// @access Private
const blockAndUnblockDriver = asyncHandler(async (req, res) => {
    if (!req.body.id) {
        res.status(400)
        throw new Error('Driver not found')
    }
    const driver = await Drivers.findById(req.body.id)
    if (driver.isBlocked) {
        const unBlock = await Drivers.findByIdAndUpdate(req.body.id, {
            isBlocked: false
        })
        if (unBlock) {
            res.status(200).json({ message: `${driver.name}'s Account Unblocked` })
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    } else {
        const block = await Drivers.findByIdAndUpdate(req.body.id, {
            isBlocked: true
        })
        if (block) {
            res.status(200).json({ message: `${driver.name}'s Account Blocked` })
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})


const generateTocken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '10d'
    })
}

module.exports = {
    loginAdmin,
    adminDashboard,
    adminCars,
    adminAddCars,
    adminDeleteCar,
    adminEditCar,
    adminUsers,
    blockAndUnblockUser,
    addPlace,
    getPlace,
    getBrands,
    addBrand,
    deleteBrand,
    deletePlace,
    adminDrivers,
    approveDriver,
    declineDriver,
    blockAndUnblockDriver,
    adminBookings,
    singleUser
}