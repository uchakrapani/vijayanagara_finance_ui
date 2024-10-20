import React from 'react'
import Header from './Header'
import { Route, Routes } from 'react-router-dom'
import Home from '../home/Home'
import Footer from './Footer'
import Login from './Login'
import { Container } from 'react-bootstrap'
import LoanApplicationForm from './LoanApplicationForm'
import AvailableServices from './AvailableServices'

const HomeLanding = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loan-apply" element={<LoanApplicationForm />} />
        <Route path="/available-services" element={<AvailableServices />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default HomeLanding
