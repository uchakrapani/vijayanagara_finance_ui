import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DashboardChart from './DashboardChart';
import './Home.css'; // Import custom CSS for styling

const Home = () => {
    return (
        <Container className="p-4">
            <Row>
                <Col md={12}> {/* Set to 12 to occupy full width */}
                    <Card className="h-100 shadow-sm border-0"> {/* Use shadow for depth and border-0 for a cleaner look */}
                        <Card.Body>
                            <Card.Title className="text-center display-4 text-primary">Welcome to Vijayanagara Finance</Card.Title>
                            <Card.Text className="text-center lead">
                                Your gateway to financial solutions. Discover insights and manage your areas and administrators efficiently.
                            </Card.Text>
                            <DashboardChart />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
