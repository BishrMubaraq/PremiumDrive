const express = require('express')
const { addMessage, getMessage } = require('../controllers/messageController')
const router = express.Router()

router.post('/', addMessage)
router.get('/', getMessage)

module.exports = router