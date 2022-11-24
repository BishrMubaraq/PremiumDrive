import * as React from 'react';
import List from '@mui/material/List';

import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../utils/axiosInstance';
import ChatListItem from '../ChatListItem/ChatListItem';


export default function InboxList() {
  const { admin } = useSelector((state) => state.adminAuth)
  const [chats, setChats] = useState([])
  const getChats = async () => {
    try {
      const { data } = await axiosInstance.get(`chat?adminId=${admin._id}`)
      setChats(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getChats()
  },[admin])
  return (
    <Box mt={'100px'} sx={{ width: '100%' }}>
      <h3>All Messages</h3>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {chats.map((chat)=>(
        <ChatListItem key={chat._id} data={chat} currentUserId={admin._id}/>
        ))}
      </List>
    </Box>
  );
}