import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa'; // Importing a check icon
import "./WhyToChooseUs.css";

const WhyChooseUs = () => {

    const services = [
        {
            title: 'Loan for Unexpected Expenses',
            description: 'You can get a loan in a few hours to confront any sudden emergence of expenses.',
            image: 'https://img.freepik.com/free-vector/bank-loan-concept-illustration_114360-21880.jpg?ga=GA1.1.1794917097.1729332922&semt=ais_hybrid', // Replace with your actual image URL
        },
        {
            title: 'Immediate Loan',
            description: 'Immediate loan service benefits your multiple requirements like paying credit bills, rent, travel expenses, etc.',
            image: 'https://img.freepik.com/free-vector/bank-loan-concept-illustration_114360-25995.jpg?ga=GA1.1.1794917097.1729332922&semt=ais_hybrid', // Replace with your actual image URL
        },
        {
            title: 'No Prepayment for the Approval',
            description: 'No need to pay any charges before the disbursal of the loan amount.',
            image: 'https://img.freepik.com/premium-vector/bank-with-rupee-bundle-money-bag-coin-showing-npa-bad-loan-concept-vector-illustration_667085-2.jpg?ga=GA1.1.1794917097.1729332922&semt=ais_hybrid', // Replace with your actual image URL
        },
    ];

    return (
        <>
            <Container className="my-5">
                <h2 style={{ textAlign: 'center', paddingTop: '43px' }}>
                    Loan for Solving Temporary Financial Shortage
                </h2>
                <Row className="mt-4">
                    {services.map((service, index) => (
                        <Col md={4} key={index} className="mb-4">
                            <div className="post-item">
                                <div className="post-item-inner">
                                    <div className="post-thumb">
                                        <div className="round-1">
                                            <div className="services-circle-wrapper">
                                                <div className="services-circle"></div>
                                            </div>
                                            <div className="services-circle-wrapper">
                                                <div className="services-circle"></div>
                                            </div>
                                        </div>
                                        <div className="round-2"></div>
                                        <div className="service-icon">
                                            <img src={service.image} style={{ height: '52px' }} alt={service.title} />
                                        </div>
                                    </div>
                                    <div className="post-content">
                                        <h5>{service.title}</h5>
                                        <p>{service.description}</p>
                                        <a href="apply-now.php" className="service-flaticon flaticon-next">Apply Now</a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Container className="my-5">
                <Row>
                    <Col lg={6} md={12}>
                        <div className="post-thumb">
                            <img
                                src="https://image.freepik.com/free-photo/why-choose-us_220873-5578.jpg" // Replace with your image URL
                                style={{ marginTop: '48px', width: '100%', height: 'auto' }} // Ensure the image is responsive
                                alt="Consulting"
                            />
                        </div>
                    </Col>
                    <Col lg={6} md={12}>
                        <div className="post-content">
                            <h2>Why Choose Us?</h2>
                            <p>We provide distinguished services where our team of experts helps you get an instant loan without any difficulties.</p>
                            <ul className="list-unstyled">
                                <li>
                                    <FaCheck /> <b>Team of Experts:</b>
                                    <p>Expert professionals accomplish our services; they help you get a loan without consuming your time.</p>
                                </li>
                                <li>
                                    <FaCheck /> <b>Transparency:</b>
                                    <p>There is complete transparency in our services and costs. There are no hidden charges on the loan amount.</p>
                                </li>
                                <li>
                                    <FaCheck /> <b>Simple Steps to Apply:</b>
                                    <p>The application for the loan is extremely easy. There are some simple steps to applying for a loan.</p>
                                </li>
                                <li>
                                    <FaCheck /> <b>Precise Information:</b>
                                    <p>Our executive shares the precise information for the loan services. So, there are no chances of ambiguity.</p>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default WhyChooseUs;
