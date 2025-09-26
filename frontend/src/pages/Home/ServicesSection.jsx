import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { GraduationCap, BookOpen, Briefcase, ArrowRight } from 'lucide-react';

const ServicesSection = () => {
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

    const section = document.getElementById('services-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: GraduationCap,
      title: "Study Abroad",
      description: "Complete guidance for Japanese university admissions, scholarships, and student visa processing.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
      delay: 1
    },
    {
      icon: BookOpen,
      title: "Language Classes",
      description: "Expert Japanese language training from beginner to advanced levels with certified instructors.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
      delay: 2
    },
    {
      icon: Briefcase,
      title: "Working Visa Support",
      description: "Professional assistance for work visa applications and job placement in Japan.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      delay: 3
    }
  ];

  return (
    <section id="services-section" className="py-5">
      <Container>
        <Row className={`text-center mb-5 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <Col>
            <h2 className="fw-bold mb-3">Our Services</h2>
            <p className="lead text-muted">Three pillars of your Japanese journey</p>
          </Col>
        </Row>
        <Row>
          {services.map((service, index) => (
            <Col lg={4} md={6} className={`mb-4 ${isVisible ? `animate-fade-up animate-delay-${service.delay}` : 'opacity-0'}`} key={index}>
              <Card className="h-100 border-0 shadow-sm hover-lift">
                <div className="position-relative overflow-hidden">
                  <Card.Img 
                    variant="top" 
                    src={service.image}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                       style={{ background: 'rgba(251, 182, 206, 0.1)' }}>
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ 
                        width: '60px', 
                        height: '60px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: 'var(--brand-primary-dark)'
                      }}
                    >
                      <service.icon size={24} />
                    </div>
                  </div>
                </div>
                <Card.Body className="p-4 text-center">
                  <Card.Title className="h4 mb-3">{service.title}</Card.Title>
                  <Card.Text className="text-muted mb-4">
                    {service.description}
                  </Card.Text>
                  <Button variant="link" className="p-0 text-decoration-none fw-semibold" style={{ color: 'var(--brand-accent-red)' }} href={index === 0 ? '/study-abroad' : index === 1 ? '/classes' : '/work-visa'}>
                    Learn more <ArrowRight size={16} className="ms-2" />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ServicesSection;