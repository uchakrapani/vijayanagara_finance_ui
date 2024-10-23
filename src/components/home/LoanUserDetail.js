import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
  Table,
  Button,
  Form,
} from "react-bootstrap";
import LoanUserStatusList from "./LoanUserStatusList";

const LoanUserDetail = () => {
  const [loanUser, setLoanUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("emailId"); // Default search by emailId

  const fetchLoanUserDetail = async (term) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://vijayanagara-finance-api.vercel.app/loanuser/userreq?${searchBy}=${term}`
      );

      if (!response.ok) {
        throw new Error("Loan user not found");
      }

      const data = await response.json();
      setLoanUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLoanUserDetail(searchTerm);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Search Loan User</h2>
      <Form onSubmit={handleSearch} className="mb-4">
        <Row className="align-items-center">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder={`Search by ${searchBy}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
          </Col>
          <Col md={2}>
            <Form.Select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option value="emailId">Email</option>
              <option value="reference_no">Reference No</option>
              <option value="phone">Phone</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>

      {loanUser && (
        <Card className="mb-4">
          <Card.Body>
            <h5>Personal Information</h5>
            <Table bordered className="table-border">
              <tbody>
                <tr>
                  <td>
                    <strong>Full Name:</strong>
                  </td>
                  <td>{loanUser.fullName}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Email:</strong>
                  </td>
                  <td>{loanUser.emailId}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Phone:</strong>
                  </td>
                  <td>{loanUser.phone}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Login ID:</strong>
                  </td>
                  <td>{loanUser.loginId}</td>
                </tr>
                <tr>
                  <td>
                    <strong>PAN Card:</strong>
                  </td>
                  <td>{loanUser.pancard}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Aadhar:</strong>
                  </td>
                  <td>{loanUser.aadhar}</td>
                </tr>
              </tbody>
            </Table>

            <h5>Loan Information</h5>
            <Table bordered className="table-border">
              <tbody>
                <tr>
                  <td>
                    <strong>Salary:</strong>
                  </td>
                  <td>₹{loanUser.salary}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Loan Amount Requested:</strong>
                  </td>
                  <td>₹{loanUser.loan_amount_req}</td>
                </tr>
                <tr>
                  <td>
                    <strong>City:</strong>
                  </td>
                  <td>{loanUser.city}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Zip Code:</strong>
                  </td>
                  <td>{loanUser.zipcode}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Status:</strong>
                  </td>
                  <td>{loanUser.status}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Reference No:</strong>
                  </td>
                  <td>{loanUser.reference_no}</td>
                </tr>
              </tbody>
            </Table>

            <h5>Status of the Loan</h5>
            <LoanUserStatusList loanUserId={loanUser._id} />
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default LoanUserDetail;
