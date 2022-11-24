import React from 'react'
import './Chat.scss'
import { Avatar } from '@mui/material'
import { useLocation } from 'react-router-dom'

const ChatContent = () => {
    const data = useLocation()
    console.log(data);
    if (data.state === null) {
        return (<><div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><h3>Please select a chat</h3></div></>)
    }
    return (
        <div className="chat_box_container">
            <div className="chat_wrapper">
                <div className="chat_header">
                    <Avatar>{data?.state?.name ? data?.state?.name.charAt(0) : 'A'}</Avatar>
                    <h3>{data?.state?.name ? data?.state?.name : 'Admin'}</h3>
                </div>
                <div className="messages">

                    <div className='left_message'>Hi Jhon</div>
                    <div className='left_message'>Hi Jhonkjdfhdskfhdskfhlkjdhfksddkfjdskfhd hfkjdshfdsk jdshfdksjfh h sdjhfhsdfkjd hfdjs fhsdjkfh</div>
                    <div className='right_message'>Hello peter</div>
                    <div className='left_message'>Hi Jhon</div>
                    <div className='right_message'>Hello peter</div>
                    <div className='left_message'>Hi Jhon</div>
                    <div className='left_message'>Hi Jhon</div>
                    <div className='right_message'>Hello peter</div>
                    <div className='left_message'>Hi Jhon</div>
                    <div className='left_message'>Hi Jhon</div>
                    <div className='right_message'>Hello peter</div>

                </div>
                <div className="field">
                    <input type={'text'} placeholder='Type your message...' />
                    <button><i className="ri-send-plane-fill"></i></button>
                </div>
            </div>
        </div>
    )
}

export default ChatContent