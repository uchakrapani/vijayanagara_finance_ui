import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Alert, Spinner, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const ContactUs = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(5); // Number of contacts per page

  // Fetch contact submissions from the API
  const fetchContacts = async () => {
    try {
      const response = await fetch('https://vijayanagara-finance-api.vercel.app/contact');
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this contact?');

    if (confirmDelete) {
      try {
        const response = await fetch(`https://vijayanagara-finance-api.vercel.app/contact/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete the contact');
        }

        setSuccessMessage('Contact deleted successfully!');
        setContacts(contacts.filter(contact => contact._id !== id));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  // Filter contacts based on the search term
  const filteredContacts = contacts.filter(contact =>
    contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  return (
    <Container className="mt-5">
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-3">
        <Col md={8}>
          <h2>Contact Requests</h2>
        </Col>
        <Col md={4}>
          <InputGroup>
            <FormControl
              placeholder="Search by name, email, or phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.length > 0 ? (
              currentContacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.fullName}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.message}</td>
                  <td>
                    <FaTrash
                      onClick={() => handleDelete(contact._id)}
                      style={{ cursor: 'pointer', color: 'red' }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No contact requests found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between mt-3">
        <Button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <Button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default ContactUs;
