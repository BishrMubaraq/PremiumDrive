const asyncHandler = require('express-async-handler')
const Message = require('../models/messageModel')

// @desc add a new Message
// @route POST /api/message/
// @access Private
const addMessage=asyncHandler(async(req,res)=>{
    const {chatId,senderId,text}=req.body
    const message = new Message({
        chatId,
        senderId,
        text
    })
    const result=await message.save()
    res.status(200).json(result)
})
// @desc get a new Message
// @route GET /api/message/
// @access Private
const getMessage=asyncHandler(async(req,res)=>{
    const result = await Message.find({chatId:req.query.chatId})
    res.status(200).json(result)
})

module.exports={
    addMessage,getMessage
}