import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Alert } from 'react-bootstrap';
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
    return <Alert variant="danger">Error: {error}</Alert>; // Show error message if fetching fails
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
        {admins.map((admin) => (
          <Col md={4} key={admin._id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{admin.fullname}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{admin.email}</Card.Subtitle>
                <Card.Text>
                  <strong>Phone:</strong> {admin.phone} <br />
                  <strong>Status:</strong> 
                  <span className={`badge ${admin.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                    {admin.status}
                  </span>
                  <br />
                  <strong>Date Created:</strong> {new Date(admin.datecreated).toLocaleString()} {/* Format date */}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="warning" onClick={() => navigate(`/dashboard/edit-admin/${admin._id}`)}>
                    <FaEdit /> {/* Edit Icon */}
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(admin._id)}>
                    <FaTrash /> {/* Delete Icon */}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminList;
