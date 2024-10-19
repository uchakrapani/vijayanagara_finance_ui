import React from 'react';
import { Carousel } from 'react-bootstrap';
import './LandingBanner.css'; // Import custom CSS for styling

const LandingBanner = () => {
    return (
        <Carousel className="landing-banner" indicators={false} controls={false}>
            <Carousel.Item>
                <div className="carousel-image-container">
                    <img
                        className="d-block w-100"
                        src="https://img.freepik.com/free-photo/girl-grey-sweater-stopping-something_144627-51406.jpg?ga=GA1.1.1794917097.1729332922&semt=ais_hybrid"
                        alt="First slide"
                    />
                    <div className="carousel-caption-overlay">
                        <h3>Flexible Loan Options</h3>
                        <p>We offer customized loan solutions to meet your needs.</p>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="carousel-image-container">
                    <img
                        className="d-block w-100"
                        src="https://img.freepik.com/free-photo/woman-holding-yellow-moneybox-with-arm-up_1187-5389.jpg?ga=GA1.1.1794917097.1729332922&semt=ais_hybrid"
                        alt="Second slide"
                    />
                    <div className="carousel-caption-overlay">
                        <h3>Flexible Loan Options</h3>
                        <p>We offer customized loan solutions to meet your needs.</p>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="carousel-image-container">
                    <img
                        className="d-block w-100"
                        src="https://img.freepik.com/free-photo/young-girl-pretending-show-something-while-holding-clock-t-shirt-jeans-looking-happy-front-view_176474-58875.jpg?ga=GA1.1.1794917097.1729332922&semt=ais_hybrid"
                        alt="Third slide"
                    />
                    <div className="carousel-caption-overlay">
                        <h3>Easy Repayment Plans</h3>
                        <p>Choose a repayment plan that fits your budget.</p>
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
    );
};

export default LandingBanner;
