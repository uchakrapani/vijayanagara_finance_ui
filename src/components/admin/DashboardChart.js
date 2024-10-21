import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Row, Col } from 'react-bootstrap';

const DashboardChart = () => {
  const [areaData, setAreaData] = useState([]);
  const [adminData, setAdminData] = useState([]);

  // Fetch Area data
  const fetchAreaData = async () => {
    try {
      const response = await fetch('https://vijayanagara-finance-api.vercel.app/area');
      const result = await response.json(); 
      console.log('Fetched area data:', result);

      // Ensure the data is in the expected format
      if (Array.isArray(result.data)) {
        setAreaData(result.data); 
      } else {
        console.error('Area data is not an array:', result.data);
      }
    } catch (error) {
      console.error('Error fetching area data:', error);
    }
  };

  // Fetch Admin data
  const fetchAdminData = async () => {
    try {
      const response = await fetch('https://vijayanagara-finance-api.vercel.app/admin');
      const data = await response.json();
      console.log('Fetched admin data:', data);
      if (Array.isArray(data)) {
        setAdminData(data); 
      } else {
        console.error('Admin data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  useEffect(() => {
    fetchAreaData();
    fetchAdminData();
  }, []);

  // Process data for charts
  const areaStatusCounts = areaData.reduce((acc, area) => {
    acc[area.status] = (acc[area.status] || 0) + 1;
    return acc;
  }, {});

  const adminStatusCounts = adminData.reduce((acc, admin) => {
    acc[admin.status] = (acc[admin.status] || 0) + 1;
    return acc;
  }, {});

  const areaChartData = Object.keys(areaStatusCounts).map((status) => ({
    name: status,
    value: areaStatusCounts[status],
  }));

  const adminChartData = Object.keys(adminStatusCounts).map((status) => ({
    name: status,
    value: adminStatusCounts[status],
  }));

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h3>Area Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={areaChartData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                {areaChartData.map((entry, index) => (
                  <Cell key={`area-cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col md={6}>
          <h3>Admin Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={adminChartData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                {adminChartData.map((entry, index) => (
                  <Cell key={`admin-cell-${index}`} fill={['#FF6384', '#36A2EB', '#FFCE56'][index % 3]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardChart;
