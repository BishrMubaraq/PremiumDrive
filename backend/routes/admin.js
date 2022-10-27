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
    blockAndUnblockUser
} = require('../controllers/adminController')
const { adminProtect } = require('../middleware/authMiddleware')

router.post('/login', loginAdmin)
router.get('/', adminProtect, adminDashboard)
router.get('/cars', adminProtect, adminCars)
router.post('/addCars', adminProtect, adminAddCars)
router.patch('/deleteCar',adminProtect,adminDeleteCar)
router.put('/editCar',adminProtect,adminEditCar)
router.get('/users',adminProtect,adminUsers)
router.patch('/blockAndUnblockUser',adminProtect,blockAndUnblockUser)

module.exports = router