const express = require('express')
const { createChat,findChat,getAllChats } = require('../controllers/chatController')
const router = express.Router()

router.post('/',createChat)
router.get('/',getAllChats)
router.get('/find',findChat)


module.exports = router