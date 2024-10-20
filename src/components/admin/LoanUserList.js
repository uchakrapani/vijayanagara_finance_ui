import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';

const LoanUserList = () => {
  const [loanUsers, setLoanUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch loan user data
  useEffect(() => {
    const fetchLoanUsers = async () => {
      try {
        const response = await axios.get(
          'https://vijayanagara-finance-api.vercel.app/loanuser'
        );
        console.log(response)
        setLoanUsers(response.data); // Assuming the API returns an array of loan users
        setLoading(false);
      } catch (err) {
        console.error('Error fetching loan user data:', err);
        setError('Failed to load loan user data. Please try again later.');
        setLoading(false);
      }
    };

    fetchLoanUsers();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Loan User List</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Reference No</th>
              <th>Full Name</th>
              <th>PAN Card</th>
              <th>Aadhaar</th>
              <th>Salary</th>
              <th>Loan Amount Requested</th>
              <th>City</th>
              <th>State</th>
              <th>ZIP Code</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loanUsers.length > 0 ? (
              loanUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{user.reference_no}</td>
                  <td>{user.fullName}</td>
                  <td>{user.pancard}</td>
                  <td>{user.aadhar}</td>
                  <td>{user.salary}</td>
                  <td>{user.loan_amount_req}</td>
                  <td>{user.city}</td>
                  <td>{user.State}</td>
                  <td>{user.zipcode}</td>
                  <td>{user.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="15" className="text-center">
                  No loan users found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default LoanUserList;
