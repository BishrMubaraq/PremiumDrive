const express = require('express')
const { createChat,findChat,getAllChats } = require('../controllers/chatController')
const router = express.Router()

router.get('/',getAllChats)
router.post('/create/',createChat)
router.get('/find',findChat)


module.exports = router