import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white">
      <Container className="py-5">
        <Row>
          {/* Company Info */}
          <Col lg={4} md={6} className="mb-4">
            <div className="footer-brand mb-4">
              <h4 className="fw-bold mb-3" style={{ color: 'var(--brand-accent-pink)' }}>
                🌸 Sakura Japan Consultancy
              </h4>
              <p className="text-light-gray mb-3">
                Your trusted partner for studying, working, and living in Japan. 
                We provide comprehensive support for your Japanese journey.
              </p>
            </div>
            
            <div className="contact-info">
              <div className="d-flex align-items-center mb-2">
                <MapPin size={16} className="me-2" style={{ color: 'var(--brand-accent-pink)' }} />
                <small>Tokyo, Japan & International Offices</small>
              </div>
              <div className="d-flex align-items-center mb-2">
                <Phone size={16} className="me-2" style={{ color: 'var(--brand-accent-pink)' }} />
                <small>+81-3-XXXX-XXXX</small>
              </div>
              <div className="d-flex align-items-center mb-2">
                <Mail size={16} className="me-2" style={{ color: 'var(--brand-accent-pink)' }} />
                <small>info@sakurajapan.com</small>
              </div>
              <div className="d-flex align-items-center">
                <Clock size={16} className="me-2" style={{ color: 'var(--brand-accent-pink)' }} />
                <small>Mon-Fri: 9:00 AM - 6:00 PM JST</small>
              </div>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3" style={{ color: 'var(--brand-accent-pink)' }}>Services</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="/study-abroad">Study Abroad</a></li>
              <li><a href="/work-visa">Work Visa</a></li>
              <li><a href="/language-classes">Language Classes</a></li>
              <li><a href="/destinations">Universities</a></li>
              <li><a href="/scholarships">Scholarships</a></li>
              <li><a href="/living-guide">Living Guide</a></li>
            </ul>
          </Col>

          {/* Company Links */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3" style={{ color: 'var(--brand-accent-pink)' }}>Company</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/team">Our Team</a></li>
              <li><a href="/testimonials">Testimonials</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </Col>

          {/* Resources */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3" style={{ color: 'var(--brand-accent-pink)' }}>Resources</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="/gallery">Gallery</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/guides">Guides</a></li>
              <li><a href="/news">News</a></li>
              <li><a href="/downloads">Downloads</a></li>
              <li><a href="/support">Support</a></li>
            </ul>
          </Col>

          {/* Social & Newsletter */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3" style={{ color: 'var(--brand-accent-pink)' }}>Follow Us</h6>
            <div className="social-links mb-4">
              <a href="#" className="social-link me-3">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link me-3">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link me-3">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link">
                <Linkedin size={20} />
              </a>
            </div>
            
            <div className="newsletter">
              <h6 className="fw-bold mb-2" style={{ color: 'var(--brand-accent-pink)' }}>Newsletter</h6>
              <p className="small text-light-gray mb-3">Get updates on Japan opportunities</p>
              <div className="input-group input-group-sm">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Your email"
                  style={{ backgroundColor: '#444', border: 'none', color: 'white' }}
                />
                <button 
                  className="btn btn-sm"
                  style={{ backgroundColor: 'var(--brand-accent-red)', border: 'none' }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Bottom Bar */}
      <div className="footer-bottom border-top border-secondary">
        <Container>
          <Row className="py-3">
            <Col md={6}>
              <small className="text-light-gray">
                © 2024 Sakura Japan Consultancy. All rights reserved.
              </small>
            </Col>
            <Col md={6} className="text-md-end">
              <small>
                <a href="/privacy" className="text-light-gray me-3">Privacy Policy</a>
                <a href="/terms" className="text-light-gray me-3">Terms of Service</a>
                <a href="/cookies" className="text-light-gray">Cookie Policy</a>
              </small>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;