import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import LandingBanner from './LandingBanner';
import WhyChooseUs from '../../WhyChooseUs';

const LandingPage = () => {
    return (
        <div>
            <LandingBanner />
            <WhyChooseUs />
        </div>
    );
};

export default LandingPage;
