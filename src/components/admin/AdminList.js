import React, { useEffect, useState } from 'react';
import { Container, Table, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons for Edit and Delete

const AdminList = () => {
  const [admins, setAdmins] = useState([]); // State for admins
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate(); // To navigate to other pages

  // Fetch admin data from the API
  const fetchAdmins = async () => {
    try {
      const response = await fetch('https://vijayanagara-finance-api.vercel.app/admin');
      if (!response.ok) {
        throw new Error('Failed to fetch admins');
      }
      const data = await response.json();
      setAdmins(data); // Set the admin data
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this admin?');
    if (confirmDelete) {
      try {
        const response = await fetch(`https://vijayanagara-finance-api.vercel.app/admin/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete admin');
        }
        // Refetch the admin list after successful deletion
        fetchAdmins();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    fetchAdmins(); // Fetch admin data when the component mounts
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if fetching fails
  }

  return (
    <Container>
      <Row className="mb-3">
        <Col md={8}>
          <h2>Admin List</h2>
        </Col>
        <Col md={4} className="text-end">
          <Link to="/dashboard/create-admin"> {/* Link to the create admin form page */}
            <Button variant="primary">Create New Admin</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Date Created</th>
                <th>Actions</th> {/* Add a new column for actions */}
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id}>
                  <td>{admin.fullname}</td>
                  <td>{admin.email}</td>
                  <td>{admin.phone}</td>
                  <td>
                    <span className={`badge ${admin.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                      {admin.status}
                    </span>
                  </td>
                  <td>{new Date(admin.datecreated).toLocaleString()}</td> {/* Format date */}
                  <td>
                    <Button variant="warning" className="me-2" onClick={() => navigate(`/dashboard/edit-admin/${admin._id}`)}>
                      <FaEdit /> {/* Edit Icon */}
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(admin._id)}>
                      <FaTrash /> {/* Delete Icon */}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminList;
