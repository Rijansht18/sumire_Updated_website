import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Offcanvas, NavDropdown } from 'react-bootstrap';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm" style={{ height: '64px' }}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            🌸 Sakura Japan
          </Navbar.Brand>
          
          <Button variant="outline-dark" className="d-lg-none" onClick={handleShow}>
            <Menu size={20} />
          </Button>

          <Navbar.Collapse className="d-none d-lg-flex">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/" className="fw-semibold">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className="fw-semibold">About</Nav.Link>
              
              <NavDropdown title="Services" className="fw-semibold">
                <NavDropdown.Item as={Link} to="/services">All Services</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/study-abroad">Study Abroad</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/classes">Language Classes</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/work-visa">Work Visa</NavDropdown.Item>
              </NavDropdown>
              
              <NavDropdown title="Japan Guide" className="fw-semibold">
                <NavDropdown.Item as={Link} to="/destinations">Universities</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/scholarships">Scholarships</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/living-guide">Living Guide</NavDropdown.Item>
              </NavDropdown>
              
              <NavDropdown title="Resources" className="fw-semibold">
                <NavDropdown.Item as={Link} to="/blog">Blog</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/events">Events</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/gallery">Gallery</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/faq">FAQ</NavDropdown.Item>
              </NavDropdown>
              
              <Nav.Link as={Link} to="/contact" className="fw-semibold">Contact</Nav.Link>
            </Nav>
            <Button className="btn-accent-red">Book Free Counseling</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title>🌸 Sakura Japan</Offcanvas.Title>
          <Button variant="outline-dark" onClick={handleClose}>
            <X size={20} />
          </Button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={handleClose}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={handleClose}>About</Nav.Link>
            <hr className="my-2" />
            <small className="text-muted px-3 mb-2">Services</small>
            <Nav.Link as={Link} to="/services" onClick={handleClose} className="ps-4">All Services</Nav.Link>
            <Nav.Link as={Link} to="/study-abroad" onClick={handleClose} className="ps-4">Study Abroad</Nav.Link>
            <Nav.Link as={Link} to="/classes" onClick={handleClose} className="ps-4">Language Classes</Nav.Link>
            <Nav.Link as={Link} to="/work-visa" onClick={handleClose} className="ps-4">Work Visa</Nav.Link>
            <hr className="my-2" />
            <small className="text-muted px-3 mb-2">Japan Guide</small>
            <Nav.Link as={Link} to="/destinations" onClick={handleClose} className="ps-4">Universities</Nav.Link>
            <Nav.Link as={Link} to="/scholarships" onClick={handleClose} className="ps-4">Scholarships</Nav.Link>
            <Nav.Link as={Link} to="/living-guide" onClick={handleClose} className="ps-4">Living Guide</Nav.Link>
            <hr className="my-2" />
            <small className="text-muted px-3 mb-2">Resources</small>
            <Nav.Link as={Link} to="/blog" onClick={handleClose} className="ps-4">Blog</Nav.Link>
            <Nav.Link as={Link} to="/events" onClick={handleClose} className="ps-4">Events</Nav.Link>
            <Nav.Link as={Link} to="/gallery" onClick={handleClose} className="ps-4">Gallery</Nav.Link>
            <Nav.Link as={Link} to="/faq" onClick={handleClose} className="ps-4">FAQ</Nav.Link>
            <hr className="my-2" />
            <Nav.Link as={Link} to="/contact" onClick={handleClose}>Contact</Nav.Link>
          </Nav>
          <Button className="btn-accent-red mt-3 w-100">Book Free Counseling</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavigationBar;