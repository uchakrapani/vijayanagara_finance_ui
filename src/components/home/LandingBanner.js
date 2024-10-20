import React from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const LandingBanner = () => {
    return (
        <Container fluid className="text-center mt-1">
            <img
                className="img-fluid"
                src={`${process.env.PUBLIC_URL}/banner.png`} // Image from public folder
                alt="Banner"
                style={{ width: '100%', height: 'auto' }} // Ensure the image is responsive
            />
        </Container>
    );
};

export default LandingBanner;
