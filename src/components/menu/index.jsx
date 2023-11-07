import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function Menu() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className="text-primary fw-bold">
          Porto<span className="text-dark">.</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Containers</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
