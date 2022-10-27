import React from 'react'
import './Footer.scss'

function Footer() {
    return (
        <footer className='footer'>
            <div className="footer_wrapper">
                <div className="upper_part">
                    <h2>Premium Drive</h2>
                </div>
                <div className="lower_part">
                    <div className="nav_list">
                        <ul>
                            <li>Home</li>
                            <li>Cars</li>
                            <li>About Us</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div className="address_part">
                        <h3>Get in Touch</h3>
                        <div className="address">

                            <span><i className="ri-map-pin-line"></i></span>
                            <p> 3, 1047/2, Premium Drive Company Pvt LTD
                                M.G. Road, <br /> Thevara
                                Ernakulam, Kerala, <br /> 682015</p>
                        </div>
                    </div>
                    <div className="social_media">
                        <span><i className="ri-mail-line"></i> premiumdrive@gmail.com</span>
                        <span><i className="ri-phone-line"></i> 9446827318</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer