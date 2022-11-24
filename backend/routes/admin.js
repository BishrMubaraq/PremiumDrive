const express = require('express')
const router = express.Router()
const {
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
    addBrand,
    getBrands,
    deleteBrand,
    deletePlace,
    adminDrivers,
    approveDriver,
    declineDriver,
    blockAndUnblockDriver,
    adminBookings,
    singleUser
} = require('../controllers/adminController')
const { adminProtect } = require('../middleware/authMiddleware')

router.post('/login', loginAdmin)
router.get('/', adminProtect, adminDashboard)

// Places
router.get('/getPlaces', getPlace)
router.post('/addPlace', adminProtect, addPlace)
router.delete('/deletePlace', adminProtect, deletePlace)

// Bookings
router.get('/getBookings', adminProtect, adminBookings)


// Brands
router.get('/getBrands', getBrands)
router.post('/addBrand', adminProtect, addBrand)
router.delete('/deleteBrand', adminProtect, deleteBrand)

// Car
router.get('/cars', adminProtect, adminCars)
router.post('/addCars', adminProtect, adminAddCars)
router.patch('/deleteCar', adminProtect, adminDeleteCar)
router.put('/editCar', adminProtect, adminEditCar)

// Users
router.get('/users', adminProtect, adminUsers)
router.get('/user', singleUser)
router.patch('/blockAndUnblockUser', blockAndUnblockUser)

// Drivers
router.get('/drivers', adminProtect, adminDrivers)
router.put('/approveDriver', adminProtect, approveDriver)
router.put('/declineDriver', adminProtect, declineDriver)
router.put('/blockAndUnblockDriver', blockAndUnblockDriver)

module.exports = router