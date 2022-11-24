const asyncHandler = require('express-async-handler')
const Chat=require('../models/chatModel')

// @desc Create Chat
// @route POST /api/chat/
// @access Private
const createChat=asyncHandler(async(req,res)=>{
    const newChat=new Chat({
        members:[req.body.senderId,req.body.receiverId]
    })

    const result = await newChat.save()
    if(result){
        res.status(200).json(result)
    }else{
        res.status(400)
        throw new Error('Something went wrong')
    }
})
// @desc get all users chats to admin
// @route GET /api/chat/
// @access Private
const getAllChats=asyncHandler(async(req,res)=>{
    const chat=await Chat.find({
        members:{$in:[req.query.adminId]}
    })
  
    res.status(200).json(chat)
})
// @desc get a chat
// @route POST /api/chat/find
// @access Private
const findChat=asyncHandler(async(req,res)=>{
    const chat=await Chat.findOne({
        members:{$all:[req.query.firstId,req.query.secondId]}
    })
    res.status(200).json(chat)
})
module.exports={
    createChat,
    getAllChats,
    findChat
}