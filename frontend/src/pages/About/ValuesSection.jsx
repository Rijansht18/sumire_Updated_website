import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Award, Users, Globe, Heart } from 'lucide-react';

const ValuesSection = () => {
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

    const section = document.getElementById('values-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: Heart,
      title: "Respect",
      description: "We honor Japanese culture and values in everything we do",
      delay: 1
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to providing the highest quality guidance and support",
      delay: 2
    },
    {
      icon: Users,
      title: "Community",
      description: "Building lasting relationships with students and partners",
      delay: 3
    },
    {
      icon: Globe,
      title: "Global Vision",
      description: "Connecting Nepal and Japan through education and opportunity",
      delay: 4
    }
  ];

  return (
    <section id="values-section" className="py-5 bg-surface-alt">
      <Container>
        <Row className={`text-center mb-5 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <Col>
            <h2 className="fw-bold mb-3">Our Values</h2>
            <p className="lead text-muted">The principles that guide everything we do</p>
          </Col>
        </Row>
        <Row>
          {values.map((value, index) => (
            <Col lg={3} md={6} className={`mb-4 ${isVisible ? `animate-fade-up animate-delay-${value.delay}` : 'opacity-0'}`} key={index}>
              <Card className="border-0 shadow-sm h-100 text-center hover-lift">
                <Card.Body className="p-4">
                  <div 
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      backgroundColor: 'var(--brand-accent-pink)',
                      color: 'var(--brand-primary-dark)'
                    }}
                  >
                    <value.icon size={24} />
                  </div>
                  <h5 className="fw-bold mb-3">{value.title}</h5>
                  <p className="text-muted small">{value.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ValuesSection;