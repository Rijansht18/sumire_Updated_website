import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { contactAPI } from '../../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await contactAPI.submit(formData);
      setShowSuccess(true);
      setFormData({ name: '', email: '', phone: '', purpose: '', message: '' });
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-surface-alt">
        <Container>
          <Row className={`text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <Col>
              <h1 className="fw-bold mb-3">Contact Us</h1>
              <p className="lead text-muted">
                Get in touch with our experts for personalized guidance
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        <Row>
          {/* Contact Information */}
          <Col lg={4} className={`mb-4 ${isVisible ? 'animate-fade-up animate-delay-1' : 'opacity-0'}`}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-4">Get in Touch</h4>
                
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: 'var(--brand-accent-pink)',
                        color: 'var(--brand-primary-dark)'
                      }}
                    >
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h6 className="mb-1">Office Address</h6>
                      <p className="mb-0 text-muted small">
                        Putalisadak, Kathmandu<br />
                        Nepal
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: 'var(--brand-accent-pink)',
                        color: 'var(--brand-primary-dark)'
                      }}
                    >
                      <Phone size={20} />
                    </div>
                    <div>
                      <h6 className="mb-1">Phone</h6>
                      <p className="mb-0 text-muted small">+977-1-4444444</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: 'var(--brand-accent-pink)',
                        color: 'var(--brand-primary-dark)'
                      }}
                    >
                      <Mail size={20} />
                    </div>
                    <div>
                      <h6 className="mb-1">Email</h6>
                      <p className="mb-0 text-muted small">info@sakurajapan.com</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: 'var(--brand-accent-pink)',
                        color: 'var(--brand-primary-dark)'
                      }}
                    >
                      <Clock size={20} />
                    </div>
                    <div>
                      <h6 className="mb-1">Office Hours</h6>
                      <p className="mb-0 text-muted small">
                        Sun - Fri: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Form */}
          <Col lg={8} className={`${isVisible ? 'animate-fade-up animate-delay-2' : 'opacity-0'}`}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-4">Send us a Message</h4>
                
                {showSuccess && (
                  <Alert variant="success" className="d-flex align-items-center">
                    <CheckCircle size={20} className="me-2" />
                    Thank you! We'll get back to you within 24-48 hours.
                  </Alert>
                )}
                
                {error && (
                  <Alert variant="danger">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Full Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="rounded-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Email Address *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="rounded-lg"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="rounded-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Purpose of Inquiry</Form.Label>
                        <Form.Select
                          name="purpose"
                          value={formData.purpose}
                          onChange={handleChange}
                          className="rounded-lg"
                        >
                          <option value="">Select Purpose</option>
                          <option value="study-abroad">Study Abroad Consultation</option>
                          <option value="language-classes">Language Classes</option>
                          <option value="work-visa">Work Visa Support</option>
                          <option value="general">General Inquiry</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your goals and how we can help you..."
                      className="rounded-lg"
                    />
                  </Form.Group>

                  <Button type="submit" className="btn-accent-red btn-lg" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;