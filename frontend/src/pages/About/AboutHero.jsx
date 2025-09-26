import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-5 bg-surface-alt position-relative overflow-hidden">
      <div className="position-absolute" style={{ top: '20%', right: '10%', fontSize: '60px', opacity: 0.1, animation: 'float 8s ease-in-out infinite' }}>🌸</div>
      <div className="position-absolute" style={{ bottom: '20%', left: '10%', fontSize: '80px', opacity: 0.1, animation: 'float 6s ease-in-out infinite 2s' }}>🗾</div>
      
      <Container>
        <Row className={`text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <Col lg={8} className="mx-auto">
            <h1 className="fw-bold mb-4">About Sakura Japan Consultancy</h1>
            <p className="lead text-muted">
              Your trusted partner in making Japanese dreams come true. Since 2015, we've been 
              guiding students and professionals on their journey to Japan.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutHero;