import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';

const CreateArea = () => {
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [status, setStatus] = useState('active');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const areaData = {
            city,
            state,
            zipcode,
            status,
        };

        try {
            const response = await fetch('https://vijayanagara-finance-api.vercel.app/area', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(areaData),
            });

            if (response.ok) {
                setSuccessMessage('Area created successfully!');
                setCity('');
                setState('');
                setZipcode('');
                setStatus('active'); // Reset status to default
            } else {
                const result = await response.json();
                setErrorMessage(result.message || 'Failed to create area. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Error connecting to the server. Please try again later.');
        }
    };

    return (
        <Container>
            <h2>Create Area</h2>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formState">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formZipcode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter zip code"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="active">Active</option>
                        <option value="in-active">Inactive</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Area
                </Button>
            </Form>
        </Container>
    );
};

export default CreateArea;
