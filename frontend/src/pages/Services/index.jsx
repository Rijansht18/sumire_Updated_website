import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { GraduationCap, BookOpen, Briefcase, Check } from 'lucide-react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: GraduationCap,
      title: "Study Abroad Consultation",
      description: "Complete guidance for your Japanese education journey",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
      features: [
        "University selection and application",
        "Scholarship guidance and applications",
        "Student visa processing",
        "Pre-departure orientation",
        "Accommodation assistance"
      ],
      price: "Free Consultation"
    },
    {
      icon: BookOpen,
      title: "Japanese Language Classes",
      description: "Master Japanese with our expert instructors",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
      features: [
        "Beginner to Advanced levels",
        "JLPT preparation courses",
        "Small batch sizes (8-12 students)",
        "Native Japanese instructors",
        "Flexible timing options"
      ],
      price: "From ¥15,000/month"
    },
    {
      icon: Briefcase,
      title: "Working Visa Support",
      description: "Professional assistance for work opportunities in Japan",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      features: [
        "Job placement assistance",
        "Work visa application support",
        "Resume and interview preparation",
        "Company matching services",
        "Post-arrival support"
      ],
      price: "Success-based pricing"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-surface-alt">
        <Container>
          <Row className={`text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <Col>
              <h1 className="fw-bold mb-3">Our Services</h1>
              <p className="lead text-muted">
                Comprehensive solutions for your Japanese journey
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Cards */}
      <section className="py-5">
        <Container>
          <Row>
            {services.map((service, index) => (
              <Col lg={4} md={6} className={`mb-4 ${isVisible ? `animate-fade-up animate-delay-${index + 1}` : 'opacity-0'}`} key={index}>
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
                  <Card.Body className="p-4">
                    <h4 className="fw-bold mb-2">{service.title}</h4>
                    <p className="text-muted mb-3">{service.description}</p>

                    <ul className="list-unstyled mb-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="d-flex align-items-center mb-2">
                          <Check size={16} className="me-2" style={{ color: 'var(--brand-accent-red)' }} />
                          <small>{feature}</small>
                        </li>
                      ))}
                    </ul>

                    <div className="text-center">
                      <Badge 
                        className="mb-3 px-3 py-2"
                        style={{ 
                          backgroundColor: 'var(--brand-accent-pink)', 
                          color: 'var(--brand-primary-dark)' 
                        }}
                      >
                        {service.price}
                      </Badge>
                      <div>
                        <Button className="btn-accent-red w-100">Learn More</Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Services;