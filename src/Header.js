import React from 'react'
import './Header.css';
import ClassLogo from './class-logo.svg';

function Header() {
    return (
        <div className="header">
            <img 
                className="logo" 
                src={ClassLogo} 
                />

            <div className="header__nav">
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Hello Guest
                    </span>
                    <span className="header__optionLineTwo">
                        Sign In
                    </span>    
                </div>
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Edit
                    </span>
                    <span className="header__optionLineTwo">
                        My Account
                    </span> 
                </div>
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Report
                    </span>
                    <span className="header__optionLineTwo">
                        Positive Result
                    </span> 
                </div>
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Request
                    </span>
                    <span className="header__optionLineTwo">
                        Appointment
                    </span> 
                </div>
                <div className="header__option">
                    <span className="header__optionLineOne">
                        COVID-19
                    </span>
                    <span className="header__optionLineTwo">
                        Tracker
                    </span> 
                </div>    
            </div>
        </div>
    )
}

export default Header
