import React, { useState, useEffect, useRef } from 'react'
import './Chat.scss'
import { Avatar } from '@mui/material'
import { useLocation } from 'react-router-dom'
import axiosInstance from '../../../utils/axiosInstance'
import { format } from 'timeago.js'
import { io } from 'socket.io-client'

const ChatContent = ({ currentUser }) => {
    const data = useLocation()
    const [messages, setMessages] = useState([])
    const [chat, setChat] = useState(null)
    const [chatId, setChatId] = useState(null)
    const [newMessage, setNewMessage] = useState("")
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [recieveMessage, setRecieveMessage] = useState(null)
    const socket = useRef()
    const scroll=useRef()

    useEffect(() => {
        socket.current = io('http://localhost:8800');
        socket.current.emit("new-user-add", currentUser._id)
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users)
        })
    }, [currentUser])

    // send message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage])

    // receive message from socket server
    useEffect(() => {
        socket.current.on('receive-message', (data) => {
            setRecieveMessage(data)
        })
    }, [])
    useEffect(() => {
        const getChat = async () => {
            try {
                const result = await axiosInstance.get(`chat/find?firstId=${data?.state?.senderData?._id}&secondId=${data?.state?.receiverData?._id}`)
                setChatId(result.data?._id)
                setChat(result.data)
            } catch (error) {
                console.log(error);
            }
        }
        getChat()
    }, [])

    // fetching data for messages
    useEffect(() => {
        const fetchMessages = async (chatId) => {
            try {
                const result = await axiosInstance.get(`message?chatId=${chatId}`)
                setMessages(result.data)
            } catch (error) {
                console.log(error);
            }
        }

        if (chatId) {
            fetchMessages(chatId)
        }
    }, [chat])

    const handleSend = async (e) => {
        e.preventDefault()
        const message = {
            senderId: currentUser._id,
            text: newMessage,
            chatId: chatId
        }

        // Send message
        try {
            const result = await axiosInstance.post('message', message)
            setMessages([...messages, result.data])
            setNewMessage("")
        } catch (error) {
            console.log(error);
        }

        // Send message to socket server
        const recieverId = chat.members.find((id) => id !== currentUser._id)
        setSendMessage({ ...message, recieverId })

    }
    useEffect(() => {
        if (recieveMessage !== null && recieveMessage.chatId === chatId) {
            setMessages([...messages, recieveMessage])
        }
    }, [recieveMessage])

    // Always scroll the last message 
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:'smooth'})
    },[messages])
    if (data.state === null) {
        return (<><div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><h3>Please select a chat</h3></div></>)
    }
    return (
        <div className="chat_box_container">
            <div className="chat_wrapper" >
                <div className="chat_header">
                    <Avatar>{data?.state?.receiverData?.name ? data?.state?.receiverData?.name.charAt(0) : 'A'}</Avatar>
                    <h3>{data?.state?.receiverData?.name ? data?.state?.receiverData?.name : 'Admin'}</h3>
                </div>
                <div className="messages" >
                    {messages.map((message) => (
                        <div ref={scroll} key={message._id} className={message.senderId === data?.state?.senderData?._id ? "right_message" : "left_message"}><span>{message.text}</span>
                            <span className='timeSend'>{format(message.createdAt)}</span>
                        </div>

                    ))}


                </div>
                <div className="field">
                    <input type={'text'} onChange={(e) => setNewMessage(e.target.value)} placeholder='Type your message...' />
                    <button onClick={handleSend}><i className="ri-send-plane-fill"></i></button>
                </div>
            </div>
        </div>
    )
}

export default ChatContent