import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LoanUserStatusList from "./LoanUserStatusList";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { AuthContext } from "../../AuthContext"; // Adjust the import based on your file structure

const LoanDetail = () => {
  const { loanId } = useParams();
  const { auth } = useContext(AuthContext); // Get auth context to access admin._id
  const [loanDetail, setLoanDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusData, setStatusData] = useState({ status: "", comments: "" });

  useEffect(() => {
    console.log(auth);
    const fetchLoanDetail = async () => {
      try {
        const response = await fetch(
          `https://vijayanagara-finance-api.vercel.app/loanuser/${loanId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch loan details");
        }
        const data = await response.json();
        setLoanDetail(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanDetail();
  }, [loanId]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStatusData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure adminId is available
    if (!auth || !auth._id) {
      setError("Admin ID is not available.");
      return;
    }

    try {
      const response = await fetch(
        "https://vijayanagara-finance-api.vercel.app/loan-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loanUserId: loanId,
            status: statusData.status,
            comments: statusData.comments,
            adminId: auth._id, // Use the auth._id from context
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit status");
      }

      // Optionally refresh or update state here
      handleCloseModal();
    } catch (error) {
      setError(error.message);
    }
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
      <h2>
        Loan Details
        <Button variant="primary" className="ml-3" onClick={handleShowModal}>
          Add Status
        </Button>
      </h2>
      <Card className="mb-4">
        <Card.Body>
          <h5>Personal Information</h5>
          <Table bordered className="table-border">
            <tbody>
              <tr>
                <td>
                  <strong>Full Name:</strong>
                </td>
                <td>{loanDetail.fullName}</td>
              </tr>
              <tr>
                <td>
                  <strong>Email:</strong>
                </td>
                <td>{loanDetail.emailId}</td>
              </tr>
              <tr>
                <td>
                  <strong>Phone:</strong>
                </td>
                <td>{loanDetail.phone}</td>
              </tr>
              <tr>
                <td>
                  <strong>Login ID:</strong>
                </td>
                <td>{loanDetail.loginId}</td>
              </tr>
              <tr>
                <td>
                  <strong>PAN Card:</strong>
                </td>
                <td>{loanDetail.pancard}</td>
              </tr>
              <tr>
                <td>
                  <strong>Aadhar:</strong>
                </td>
                <td>{loanDetail.aadhar}</td>
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
                <td>₹{loanDetail.salary}</td>
              </tr>
              <tr>
                <td>
                  <strong>Loan Amount Requested:</strong>
                </td>
                <td>₹{loanDetail.loan_amount_req}</td>
              </tr>
              <tr>
                <td>
                  <strong>City:</strong>
                </td>
                <td>{loanDetail.city}</td>
              </tr>
              <tr>
                <td>
                  <strong>Zip Code:</strong>
                </td>
                <td>{loanDetail.zipcode}</td>
              </tr>
              <tr>
                <td>
                  <strong>Status:</strong>
                </td>
                <td>{loanDetail.status}</td>
              </tr>
              <tr>
                <td>
                  <strong>Reference No:</strong>
                </td>
                <td>{loanDetail.reference_no}</td>
              </tr>
            </tbody>
          </Table>

          <h5>Additional Information</h5>
          <Row>
            <Col>
              <p>
                <strong>Date Created:</strong>{" "}
                {new Date(loanDetail.datecreated).toLocaleString()}
              </p>
              <p>
                <strong>Date Updated:</strong>{" "}
                {new Date(loanDetail.dateupdated).toLocaleString()}
              </p>
            </Col>
          </Row>
          <h5>Status of the Loan</h5>
          <Row>
            <Col>
              <LoanUserStatusList loanUserId={loanId} />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Modal for adding LoanUserStatus */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Loan User Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formStatus" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="submitted">Submitted</option>
                <option value="document-verification">
                  Document Verification
                </option>
                <option value="in-progress">In Progress</option>
                <option value="docs-required">Documents Required</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formComments" className="mb-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="comments"
                onChange={handleChange}
                placeholder="Enter any comments here"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>{" "}
            {/* Added margin top */}
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default LoanDetail;
