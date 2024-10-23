import React, { useEffect, useState } from "react";
import { Table, Alert, Spinner } from "react-bootstrap";

const LoanUserStatusList = ({ loanUserId }) => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatusList = async () => {
      try {
        const response = await fetch(
          `https://vijayanagara-finance-api.vercel.app/loan-status?loanuserid=${loanUserId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch status list");
        }
        const data = await response.json();
        setStatuses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatusList();
  }, [loanUserId]);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Table bordered className="mt-4">
      <thead>
        <tr>
          <th>Status</th>
          <th>Comments</th>
          <th>Date Created</th>
        </tr>
      </thead>
      <tbody>
        {statuses.map((status) => (
          <tr key={status._id}>
            <td>{status.status}</td>
            <td>{status.comments || "N/A"}</td>
            <td>{new Date(status.datecreated).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default LoanUserStatusList;
