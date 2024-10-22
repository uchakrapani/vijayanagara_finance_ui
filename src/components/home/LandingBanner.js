import React from 'react';
import './LandingBanner.css'; // Make sure this path is correct
import { Link } from 'react-router-dom';

const LandingBanner = () => {
    return (
        <div className="slider-cap-wrapper">
            <div className="hero__caption">
                <p 
                    data-animation="fadeInLeft" 
                    data-delay=".2s" 
                    style={{ animationDelay: '0.2s' }}
                >
                    Achieve your financial goal
                </p>
                <h1 
                    data-animation="fadeInLeft" 
                    data-delay=".5s" 
                    style={{ animationDelay: '0.5s' }}
                >
                    Small Business Loans For Daily Expenses.
                </h1>
                {/* Hero Btn */}
                <Link to='/home/loan-apply' 
                    className="btn hero-btn" 
                    data-animation="fadeInLeft" 
                    data-delay=".8s" 
                    tabIndex="0" 
                    style={{ animationDelay: '0.8s' }}
                >
                    Apply for Loan
                </Link>
            </div>
            <div className="hero__img">
                <img 
                src={`${process.env.PUBLIC_URL}/logo1.png`}
                 alt="" />
            </div>
        </div>
    );
};

export default LandingBanner;
