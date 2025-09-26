import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Shield, Clock, Users, Award } from 'lucide-react';

const WhyChooseUsSection = () => {
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

    const section = document.getElementById('why-choose-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Trusted Expertise",
      description: "8+ years of experience with 95% visa success rate",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
      delay: 1
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Quick visa processing and university applications",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=200&fit=crop",
      delay: 2
    },
    {
      icon: Users,
      title: "Personal Support",
      description: "Dedicated counselors for each student's journey",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop",
      delay: 3
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "2500+ successful students in top Japanese universities",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",
      delay: 4
    }
  ];

  return (
    <section id="why-choose-section" className="py-5">
      <Container>
        <Row className={`text-center mb-5 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <Col>
            <h2 className="fw-bold mb-3">Why Choose Sakura Japan?</h2>
            <p className="lead text-muted">What makes us different from others</p>
          </Col>
        </Row>
        <Row>
          {features.map((feature, index) => (
            <Col lg={3} md={6} className={`mb-4 ${isVisible ? `animate-fade-up animate-delay-${feature.delay}` : 'opacity-0'}`} key={index}>
              <Card className="border-0 shadow-sm h-100 hover-lift">
                <div className="position-relative overflow-hidden">
                  <Card.Img 
                    variant="top" 
                    src={feature.image}
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: 'var(--brand-accent-red)',
                        color: 'white'
                      }}
                    >
                      <feature.icon size={20} />
                    </div>
                  </div>
                </div>
                <Card.Body className="p-3 text-center">
                  <Card.Title className="h6 mb-2">{feature.title}</Card.Title>
                  <Card.Text className="text-muted small">
                    {feature.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default WhyChooseUsSection;