import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Users, Award, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-5 position-relative overflow-hidden" style={{ 
      background: 'linear-gradient(135deg, rgba(251, 182, 206, 0.05) 0%, rgba(255, 255, 255, 1) 100%)',
      minHeight: '90vh'
    }}>
      {/* Floating Sakura Petals */}
      <div className="position-absolute" style={{ top: '10%', left: '10%', fontSize: '30px', opacity: 0.3, animation: 'float 6s ease-in-out infinite' }}>🌸</div>
      <div className="position-absolute" style={{ top: '20%', right: '15%', fontSize: '25px', opacity: 0.2, animation: 'float 8s ease-in-out infinite 2s' }}>🌸</div>
      <div className="position-absolute" style={{ bottom: '30%', left: '20%', fontSize: '35px', opacity: 0.25, animation: 'float 7s ease-in-out infinite 1s' }}>🌸</div>
      
      <Container>
        <Row className="align-items-center" style={{ minHeight: '80vh' }}>
          <Col lg={6} className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <h1 className="display-4 fw-bold mb-4">
              Your Gateway to <span style={{ color: 'var(--brand-accent-red)' }}>Japan</span>
            </h1>
            <p className="lead text-muted mb-4">
              Expert guidance for studying, working, and living in Japan. 
              From language mastery to visa success - we make your Japanese dream a reality.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Button className="btn-accent-red btn-lg hover-lift" href="/contact">Book Free Counseling</Button>
              <Button variant="outline-dark" className="btn-lg hover-lift" href="/services">Explore Japan Pathways</Button>
            </div>
          </Col>
          <Col lg={6} className={`text-center ${isVisible ? 'animate-fade-up animate-delay-2' : 'opacity-0'}`}>
            <div className="position-relative">
              <img 
                src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=500&h=400&fit=crop" 
                alt="Mount Fuji and Sakura" 
                className="img-fluid rounded-xl shadow-lg"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
              <div className="position-absolute top-0 end-0 m-3">
                <div style={{ fontSize: '40px', animation: 'pulse 2s infinite' }}>🗾</div>
              </div>
            </div>
          </Col>
        </Row>
        
        {/* Stats Section */}
        <Row className="mt-5 pt-5">
          <Col md={4} className={`text-center mb-4 ${isVisible ? 'animate-fade-up animate-delay-3' : 'opacity-0'}`}>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center hover-glow" 
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
          <Col md={4} className={`text-center mb-4 ${isVisible ? 'animate-fade-up animate-delay-4' : 'opacity-0'}`}>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center hover-glow" 
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
          <Col md={4} className={`text-center mb-4 ${isVisible ? 'animate-fade-up animate-delay-5' : 'opacity-0'}`}>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center hover-glow" 
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

export default HeroSection;