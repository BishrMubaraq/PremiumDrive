import React,{useEffect,useState} from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import axiosInstance from '../../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const ChatListItem = ({data,currentUserId}) => {
    const navigate=useNavigate()
    const [userData,setUserData]=useState(null)
   
    useEffect(()=>{
        const userId=data.members.find((id)=>id!==currentUserId)
        const getUserData = async()=>{
            try {     
                const {data}=await axiosInstance.get(`admin/user?id=${userId}`)
                setUserData(data)
            } catch (error) {
                console.log(error);
            }
        }
        getUserData()
    },[])

    const senderData={
        _id:currentUserId
    }
    const receiverData={
        _id:userData?._id,
        name:userData?.name
    }
    return (
        <>
            <ListItem onClick={()=>{navigate('/admin/message',{state:{receiverData,senderData}})}} sx={{ cursor: 'pointer' }} secondaryAction={<p style={{ fontSize: '15px', color: 'GrayText' }}>9:00</p>}>
                <ListItemAvatar>
                    <Avatar>
                         {userData?.name.charAt(0)}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={userData?.name} secondary="Hiii PremiumDrive" />
            </ListItem>
        </>
    )
}

export default ChatListItem