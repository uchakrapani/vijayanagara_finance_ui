import React from 'react'
import Header from './Header'
import { Route,Routes } from 'react-router-dom'
import Home from '../home/Home'
import Footer from './Footer'
import Login from './Login'
import { Container } from 'react-bootstrap'

const HomeLanding = () => {
  return (
    <div>
      <Header />
      <Container className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  )
}

export default HomeLanding
