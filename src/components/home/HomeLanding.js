import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import { Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import Login from './Login';
import LoanApplicationForm from './LoanApplicationForm';
import AvailableServices from './AvailableServices';

const HomeLanding = () => {
  return (
    <div>
      <Header />
      <Container fluid className="pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loan-apply" element={<LoanApplicationForm />} />
          <Route path="/available-services" element={<AvailableServices />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
};

export default HomeLanding;
