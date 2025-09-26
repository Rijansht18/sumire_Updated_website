import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('cta-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="cta-section" className="py-5 position-relative overflow-hidden" 
             style={{ 
               background: 'linear-gradient(135deg, var(--brand-accent-red) 0%, #C53030 100%)',
               color: 'white'
             }}>
      {/* Background Elements */}
      <div className="position-absolute" style={{ top: '20%', left: '10%', fontSize: '60px', opacity: 0.1, animation: 'float 8s ease-in-out infinite' }}>🌸</div>
      <div className="position-absolute" style={{ bottom: '20%', right: '10%', fontSize: '80px', opacity: 0.1, animation: 'float 6s ease-in-out infinite 2s' }}>🗾</div>
      <div className="position-absolute" style={{ top: '50%', right: '20%', fontSize: '40px', opacity: 0.1, animation: 'float 7s ease-in-out infinite 1s' }}>⛩️</div>
      
      <Container>
        <Row className={`text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <Col lg={8} className="mx-auto">
            <div className="position-relative">
              <h2 className="fw-bold mb-3 text-white">Ready to Start Your Japan Journey?</h2>
              <p className="lead mb-4 text-white-50">
                Book a free consultation with our experts and take the first step towards your Japanese dream.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Button 
                  variant="light" 
                  className="btn-lg hover-lift fw-semibold"
                  style={{ color: 'var(--brand-accent-red)' }}
                  href="/contact"
                >
                  Book Free Counseling
                </Button>
                <Button 
                  variant="outline-light" 
                  className="btn-lg hover-lift"
                  href="/services"
                >
                  Download Brochure
                </Button>
              </div>
              
              {/* Decorative Image */}
              <div className={`mt-4 ${isVisible ? 'animate-fade-up animate-delay-2' : 'opacity-0'}`}>
                <img 
                  src="https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&h=200&fit=crop" 
                  alt="Japan Landscape" 
                  className="img-fluid rounded-xl shadow-lg"
                  style={{ maxHeight: '150px', objectFit: 'cover', opacity: 0.8 }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CTASection;