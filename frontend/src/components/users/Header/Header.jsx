import React from 'react'
import Logo from '../../../assets/PREMIUMDRIVE.png'
import {Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { logout } from '../../../redux/features/auth/authSlice'
import './Header.scss'

function Header() {
    const navigate=useNavigate()

    const {user}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    return (
        <header className='header'>
            <div className="header_wrapper">
                <div className="logo_part">
                    <img src={Logo} alt="PremiumDrive Logo" />
                </div>
                <div className="center_part">
                    <ul className='nav_part'>
                        <li className='navLink'><Link to={'/'}>Home</Link></li>
                        <li className='navLink'><Link to={'/cars'}>Cars</Link></li>
                        <li className='navLink'>About us</li>
                        <li className='navLink'>Contact us</li>
                    </ul>
                </div>
                <div className="signup_part">
                    {!user?<button onClick={()=>{
                        navigate('/login')
                    }}>Login</button>:<span onClick={()=>dispatch(logout())}><i className="ri-account-circle-fill"></i></span>}
                    
                </div>
            </div>
        </header>
    )
}

export default Header