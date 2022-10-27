const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const Admin = require('../models/adminModel')
const Cars = require('../models/carModel')
const Users = require('../models/userModel')
const bcrypt = require('bcryptjs')

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
   
   console.log(req.body);
    // const {
    //     name,
    //     rent,
    //     place,
    //     brand,
    //     transmission,
    //     fuel,
    //     body,
    //     registrationNo,
    //     image
    // } = req.body

    // if (!name || !rent || !place || !brand || !transmission || !fuel || !body || !registrationNo || !image) {
    //     res.status(400)
    //     throw new Error('Please fill all the fields')
    // }

    // const car = await Cars.create({
    //     name, rent, place, brand, transmission, fuel, body, registrationNo, image
    // })

    // if (car) {
    //     res.status(201)
    //     res.json({ message: 'Your car has been successfully added' })
    // } else {
    //     res.status(400)
    //     throw new Error('Sorry! Something went wrong')
    // }


})

// @desc Admin delete car
// @route PATCH /api/admin/deleteCar
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
// @route PATCH /api/admin/editCar
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
    const users =await Users.find()
    if(users){
        res.status(200).json(users)
    }else{
        res.status(400)
        throw new Error('Something went wrong')
    }
})

// @desc Block and Unblock users
// @route PATCH /api/admin/user
// @access Private
const blockAndUnblockUser = asyncHandler(async(req,res)=>{
    if(!req.query.id){
        res.status(400)
        throw new Error('User not found')
    }
    const user=await Users.findById(req.query.id)
    if(user.isBlocked){
        const unBlock=await Users.findByIdAndUpdate(req.query.id,{
            isBlocked:false
        })
        if(unBlock){
            res.status(200).json({message:`${user.name}'s Account Unblocked`})
        }else{
            res.status(400)
            throw new Error('Something went wrong')
        }
    }else{
        const block=await Users.findByIdAndUpdate(req.query.id,{
            isBlocked:true
        })
        if(block){
            res.status(200).json({message:`${user.name}'s Account Blocked`})
        }else{
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
    blockAndUnblockUser
}