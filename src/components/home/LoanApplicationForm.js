import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    emailId: '',
    phone: '',
    pancard: '',
    aadhar: '',
    salary: '',
    loan_amount_req: '',
    city: '',
    state: '',
    zipcode: '',
    status: 'submitted',
  });

  const [zipCodeValid, setZipCodeValid] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [referenceNo, setReferenceNo] = useState('');
  const [error, setError] = useState('');

  // Regex patterns for PAN and Aadhaar validation
  const aadharPattern = /^[0-9]{12}$/;

  // Fetch states from the area API
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('https://vijayanagara-finance-api.vercel.app/area');
        if (Array.isArray(response.data)) {
          const uniqueStates = [...new Set(response.data.map(area => area.state))];
          setStates(uniqueStates);
        } else {
          console.error('Area data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  // Fetch cities based on selected state
  useEffect(() => {
    const fetchCities = async () => {
      if (formData.state) {
        try {
          const response = await axios.get(`https://vijayanagara-finance-api.vercel.app/area?state=${formData.state}`);
          if (Array.isArray(response.data)) {
            setCities(response.data.map(area => area.city));
          } else {
            console.error('Area data is not an array:', response.data);
          }
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      } else {
        setCities([]);
      }
    };

    fetchCities();
  }, [formData.state]);

  // ZIP code validation
  useEffect(() => {
    const validateZipcode = async () => {
      if (formData.zipcode.length === 6) {
        try {
          const response = await axios.get('https://vijayanagara-finance-api.vercel.app/area');
          const validArea = Array.isArray(response.data) && response.data.find(
            (area) =>
              area.zipcode === formData.zipcode &&
              area.status === 'active' &&
              area.city === formData.city &&
              area.state === formData.state
          );
          setZipCodeValid(!!validArea);
        } catch (error) {
          console.error('Error fetching area data:', error);
        }
      } else {
        setZipCodeValid(false);
      }
    };
    validateZipcode();
  }, [formData.zipcode, formData.city, formData.state]);

  // Enable submit button only when all validations pass
  useEffect(() => {
    if (
      formData.fullName &&
      formData.emailId &&
      formData.phone &&
      aadharPattern.test(formData.aadhar) &&
      formData.salary &&
      formData.loan_amount_req &&
      formData.city &&
      formData.state &&
      zipCodeValid
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [formData, zipCodeValid]);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(''); // Reset error on input change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  

    try {
      const response = await axios.post(
        'https://vijayanagara-finance-api.vercel.app/loanuser',
        formData
      );
      console.log(response.data);
      setReferenceNo(response.data.reference_no); // Set the reference number from response
      setError(''); // Clear any previous error
      // Clear form data after submission
      setFormData({
        fullName: '',
        emailId: '',
        phone: '',
        pancard: '',
        aadhar: '',
        salary: '',
        loan_amount_req: '',
        city: '',
        state: '',
        zipcode: '',
        status: 'submitted',
      });
    } catch (error) {
      console.error('Error submitting loan application:', error);
      setError('Failed to submit loan application. Please try again later OR please check emailid/phone/aadhar/pancard detail already exists.');
      setReferenceNo(''); // Clear reference number on error
    }
  };

  return (
    <Container className="mt-5 pt-4 border border-primary rounded p-4" style={{ backgroundColor: '#f9f9f9' }}>
      <h2 className="text-center mb-4">Loan Application Form</h2>
      {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
      {referenceNo && (
        <Alert variant="success" className="mt-4">
          Loan application submitted successfully! Your reference number is: {referenceNo}
        </Alert>
      )}
      <hr style={{ border: '1px solid #007bff', margin: '20px 0' }} /> {/* Divider */}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="emailId">
              <Form.Label>Email ID</Form.Label>
              <Form.Control
                type="email"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="pancard">
              <Form.Label>PAN Card</Form.Label>
              <Form.Control
                type="text"
                name="pancard"
                value={formData.pancard}
                onChange={handleChange}
                required
                placeholder="ABCDE1234F" // Placeholder for PAN format
              />
              <Form.Control.Feedback type="invalid">
                Invalid PAN card format.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="aadhar">
              <Form.Label>Aadhaar</Form.Label>
              <Form.Control
                type="text"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
                required
                placeholder="123456789012" // Placeholder for Aadhaar format
                isInvalid={!aadharPattern.test(formData.aadhar)}
              />
              <Form.Control.Feedback type="invalid">
                Invalid Aadhaar number.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="salary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="loan_amount_req">
              <Form.Label>Loan Amount Required</Form.Label>
              <Form.Control
                type="number"
                name="loan_amount_req"
                value={formData.loan_amount_req}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select State</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                as="select"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              >
                <option value="">Select City</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>            
          </Col>
          <Col md={6}>
            <Form.Group controlId="zipcode">
              <Form.Label>ZIP Code</Form.Label>
              <Form.Control
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                required
                isInvalid={!zipCodeValid && formData.zipcode}
              />
              <Form.Control.Feedback type="invalid">
                Entered zip code is not serviceable or city or state does not match with zip code.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" disabled={submitDisabled}>
          Submit Application
        </Button>
      </Form>
    </Container>
  );
};

export default LoanApplicationForm;
