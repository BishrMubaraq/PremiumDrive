import React from 'react'
import './UserProfileContent.scss'
import { logout } from '../../../redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


const UserProfileContent = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    return (
        <div className="profile_container">
            <div className="profile_sec_wrapper">
                <div className="line">
                    <span className="profile_label">Name</span>
                    <span className='profile_name'>Bishr Mubarak</span>
                </div>
                <div className="line">
                    <span className="profile_label">Email</span>
                    <span className='profile_name'>bishrmubraq@gmail.com</span>
                </div>
                <div className="line">
                    <span className="profile_label">Phone Number</span>
                    <span className='profile_name'>9446827316</span>
                </div>
                <div className="edit_sec">
                    <button className='edit_btn'>Edit</button>
                </div>
                <div className="bottom_sec">
                    <button onClick={()=>navigate('/my-bookings')} className='booking_btn'>My Bookings</button>
                    <button onClick={() =>{
                        dispatch(logout())
                        navigate('/')
                    } } className='logout_btn'>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default UserProfileContent