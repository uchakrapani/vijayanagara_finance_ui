import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import { Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import Login from './Login';
import LoanApplicationForm from './LoanApplicationForm';
import Services from './Services';
import RepayLoan from './RepayLoan';
import AvailableServices from './AvailableServices';
import ContactUs from './ContactUs';

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
          <Route path="/services" element={<Services />} />
          <Route path="/repay-loan" element={<RepayLoan />} />
          <Route path="/service-area" element={<AvailableServices />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
};

export default HomeLanding;
