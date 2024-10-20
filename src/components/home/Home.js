import React from 'react';
import { Container } from 'react-bootstrap';
import LandingBanner from './LandingBanner';
import WhyChooseUs from './WhyChooseUs';

const LandingPage = () => {
    return (
        <Container fluid className="mt-5">
            <LandingBanner />
            <WhyChooseUs />
        </Container>
    );
};

export default LandingPage;
