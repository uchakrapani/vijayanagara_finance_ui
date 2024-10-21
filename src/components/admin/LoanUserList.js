import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Spinner, Alert, Button  } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons for Edit and Delete

const LoanUserList = () => {
  const [loanUsers, setLoanUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To navigate to other pages

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
              <th>City</th>
              <th>ZIP Code</th>
              <th>Status</th>
              <th>Actions</th> {/* Add a new column for actions */}
            </tr>
          </thead>
          <tbody>
            {loanUsers.length > 0 ? (
              loanUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{user.reference_no}</td>
                  <td>{user.fullName}</td>
                  <td>{user.city}</td>
                  <td>{user.zipcode}</td>
                  <td>{user.status}</td>
                  <td>
                    <Button variant="warning" className="me-2" onClick={() => navigate(`/dashboard/edit-loan-user/${user._id}`)}>
                      <FaEdit /> {/* Edit Icon */}
                    </Button>
                  </td>
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
