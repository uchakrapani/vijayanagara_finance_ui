import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const services = [
    {
        title: 'Instant Personal Loan',
        description: 'Get quick access to funds for personal needs without any collateral.',
        image: 'https://img.freepik.com/free-vector/bank-loan-concept-illustration_114360-17381.jpg?ga=GA1.1.1794917097.1729332922&semt=ais_hybrid', // Placeholder image
    },
    {
        title: 'Home Loan',
        description: 'Affordable home loans with flexible repayment options.',
        image: 'https://img.freepik.com/free-vector/bank-loan-concept-illustration_114360-25995.jpg?ga=GA1.1.1794917097.1729332922&semt=ais_hybrid', // Placeholder image
    },
    {
        title: 'Car Loan',
        description: 'Drive your dream car with our easy car loan options.',
        image: 'https://img.freepik.com/free-vector/bank-loan-concept-illustration_114360-21880.jpg?ga=GA1.1.1794917097.1729332922&semt=ais_hybrid', // Placeholder image
    },
    {
        title: 'Education Loan',
        description: 'Fund your education with low-interest education loans.',
        image: 'https://img.freepik.com/free-vector/mortgage-loan-abstract-concept-illustration-home-bank-credit-down-payment-real-estate-services-house-loan-pay-off-investment-portfolio-family-financial-burden_335657-1125.jpg?ga=GA1.1.1794917097.1729332922&semt=ais_hybrid', // Placeholder image
    },
    {
        title: 'Business Loan',
        description: 'Grow your business with our tailored business loan solutions.',
        image: 'https://img.freepik.com/free-vector/bank-loan-concept-illustration_114360-17863.jpg?ga=GA1.1.1794917097.1729332922&semt=ais_hybrid', // Placeholder image
    },
];

const Services = () => {
    return (
        <Container className="my-5">
            <Row className="text-center my-5">
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#007bff' }}>
                    Our Services    
                </h2>
                <p style={{ fontSize: '1.1rem', color: '#555',  margin: '0 auto' }}>
                    Get the financial support you need with our quick and hassle-free loan options. Whether it’s for unexpected expenses or urgent needs, we’re here to provide you with the assistance you require to overcome temporary financial challenges.
                </p>
            </Row   >
            <Row>
                {services.map((service, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card className="shadow">
                            <Card.Img variant="top" src={service.image} />
                            <Card.Body>
                                <Card.Title>{service.title}</Card.Title>
                                <Card.Text>{service.description}</Card.Text>
                                <Button variant="primary">Learn More</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Services;
