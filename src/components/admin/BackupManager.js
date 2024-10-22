import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button, ListGroup, Alert, Spinner } from 'react-bootstrap';

const BackupManager = () => {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch available backups
  const fetchBackups = async () => {
    try {
      const response = await axios.get('https://vijayanagara-finance-api.vercel.app/backup');
      setBackups(response.data.backups);
    } catch (err) {
      setError('Failed to fetch backup files. Please try again later.');
      console.error(err);
    }
  };

  // Create a new backup
  const createBackup = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post('https://vijayanagara-finance-api.vercel.app/backup/create');
      setSuccessMessage(response.data.message);
      fetchBackups(); // Refresh the backup list after creating a new backup
    } catch (err) {
      setError('Failed to create backup. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch backups on component mount
  useEffect(() => {
    fetchBackups();
  }, []);

  return (
    <Container className="mt-5">
      <h2>Backup Database</h2>
      <Button variant="primary" onClick={createBackup} disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : 'Create Backup'}
      </Button>

      {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      <h3 className="mt-4">Available Backups</h3>
      {backups.length === 0 ? (
        <p>No backups available.</p>
      ) : (
        <ListGroup>
          {backups.map((backup) => (
            <ListGroup.Item key={backup.name}>
              <a href={backup.downloadLink} target="_blank" rel="noopener noreferrer">
                {backup.name}
              </a>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default BackupManager;
