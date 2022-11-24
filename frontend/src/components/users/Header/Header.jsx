import React, { useState } from 'react'
import Logo from '../../../assets/PREMIUMDRIVE.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Header.scss'

function Header() {

    const [showMenu, setShowMenu] = useState(false)

    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)
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
                        <li className='navLink'>Career</li>
                        <li className='navLink'>Contact us</li>
                    </ul>
                </div>
                <div className="right_part">
                    <div className='register_part'>
                        {!user ? <button onClick={() => {
                            navigate('/login')
                        }}>Login</button> : <span ><i onClick={() => navigate('/ask-to-admin',{state:{_id:process.env.REACT_APP_ADMIN_ID}})} className="ri-chat-1-fill"></i><i onClick={() => navigate('/profile')} className="ri-account-circle-fill"></i></span>}
                    </div>

                    <div className="menu">
                       {user && <h2><i onClick={() => navigate('/ask-to-admin',{state:{_id:process.env.REACT_APP_ADMIN_ID}})} className="ri-chat-1-fill"></i></h2>}
                        <h2 onClick={() => setShowMenu(!showMenu)}><i className="ri-menu-3-line"></i></h2>
                    </div>

                </div>
            </div>
            <div className={showMenu ? "mobile_menu" : 'hide_mobile_menu'}>
                <div className="close_btn_sec">
                    <i onClick={() => { setShowMenu(!showMenu) }} className="ri-close-fill"></i>
                </div>
                <ul className='mobile_nav_part'>
                    <li className='navLink'><Link to={'/'}>My Profile</Link></li>
                    <li className='navLink'><Link to={'/'}>Home</Link></li>
                    <li className='navLink'><Link to={'/cars'}>Cars</Link></li>
                    <li className='navLink'>Career</li>
                    <li className='navLink'>Contact us</li>

                    {!user ? <button onClick={() => {
                        navigate('/login')
                    }}>Login</button> : null}

                </ul>
            </div>
        </header>
    )
}

export default Header