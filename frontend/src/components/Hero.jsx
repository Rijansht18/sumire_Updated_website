import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Users, Award, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-5" style={{ 
      background: 'linear-gradient(135deg, rgba(251, 182, 206, 0.05) 0%, rgba(255, 255, 255, 1) 100%)',
      minHeight: '80vh'
    }}>
      <Container>
        <Row className="align-items-center min-vh-75">
          <Col lg={6}>
            <h1 className="display-4 fw-bold mb-4">
              Your Gateway to <span style={{ color: 'var(--brand-accent-red)' }}>Japan</span>
            </h1>
            <p className="lead text-muted mb-4">
              Expert guidance for studying, working, and living in Japan. 
              From language mastery to visa success - we make your Japanese dream a reality.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Button className="btn-accent-red">Book Free Counseling</Button>
              <Button variant="outline-dark">Explore Japan Pathways</Button>
            </div>
          </Col>
          <Col lg={6} className="text-center">
            <div style={{ 
              fontSize: '200px', 
              opacity: 0.1, 
              color: 'var(--brand-accent-pink)',
              lineHeight: 1
            }}>
              🗾
            </div>
          </Col>
        </Row>
        
        <Row className="mt-5 pt-5">
          <Col md={4} className="text-center mb-4">
            <div className="d-flex align-items-center justify-content-center mb-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" 
                   style={{ 
                     width: '60px', 
                     height: '60px', 
                     backgroundColor: 'var(--brand-accent-pink)',
                     color: 'var(--brand-primary-dark)'
                   }}>
                <Users size={24} />
              </div>
            </div>
            <h3 className="h4 fw-bold">2,500+</h3>
            <p className="text-muted">Students Counseled</p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="d-flex align-items-center justify-content-center mb-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" 
                   style={{ 
                     width: '60px', 
                     height: '60px', 
                     backgroundColor: 'var(--brand-accent-pink)',
                     color: 'var(--brand-primary-dark)'
                   }}>
                <Award size={24} />
              </div>
            </div>
            <h3 className="h4 fw-bold">8</h3>
            <p className="text-muted">Years of Service</p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="d-flex align-items-center justify-content-center mb-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" 
                   style={{ 
                     width: '60px', 
                     height: '60px', 
                     backgroundColor: 'var(--brand-accent-pink)',
                     color: 'var(--brand-primary-dark)'
                   }}>
                <TrendingUp size={24} />
              </div>
            </div>
            <h3 className="h4 fw-bold">95%</h3>
            <p className="text-muted">Visa Success Rate</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;