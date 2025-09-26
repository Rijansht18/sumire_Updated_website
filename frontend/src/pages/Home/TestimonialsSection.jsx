import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { ArrowRight, Star } from 'lucide-react';

const TestimonialsSection = () => {
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

    const section = document.getElementById('testimonials-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Priya Sharma",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      quote: "Sakura Japan made my dream of studying at Tokyo University come true. Their guidance was invaluable throughout the entire process.",
      rating: 5,
      destination: "Tokyo University",
      program: "Computer Science",
      delay: 1
    },
    {
      name: "Raj Patel",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      quote: "The language classes were excellent. I passed JLPT N2 within 8 months of starting here. Highly recommend their teaching methods.",
      rating: 5,
      destination: "Osaka",
      program: "Japanese Language",
      delay: 2
    },
    {
      name: "Anita Gurung",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      quote: "Professional visa support helped me secure a job at a top Japanese company. The team was supportive every step of the way.",
      rating: 5,
      destination: "Kyoto",
      program: "Work Visa",
      delay: 3
    }
  ];

  return (
    <section id="testimonials-section" className="py-5 bg-surface-alt position-relative">
      {/* Background Pattern */}
      <div className="position-absolute" style={{ top: '10%', right: '5%', fontSize: '100px', opacity: 0.05, transform: 'rotate(15deg)' }}>🌸</div>
      <div className="position-absolute" style={{ bottom: '10%', left: '5%', fontSize: '80px', opacity: 0.05, transform: 'rotate(-15deg)' }}>🗾</div>
      
      <Container>
        <Row className={`text-center mb-5 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <Col>
            <h2 className="fw-bold mb-3">Success Stories</h2>
            <p className="lead text-muted">What our students say about us</p>
          </Col>
        </Row>
        <Row>
          {testimonials.map((testimonial, index) => (
            <Col lg={4} md={6} className={`mb-4 ${isVisible ? `animate-fade-up animate-delay-${testimonial.delay}` : 'opacity-0'}`} key={index}>
              <Card className="border-0 bg-white h-100 hover-lift">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="rounded-circle me-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="mb-1 fw-semibold">{testimonial.name}</h6>
                      <small className="text-muted">{testimonial.program} • {testimonial.destination}</small>
                    </div>
                  </div>
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="var(--brand-accent-red)" color="var(--brand-accent-red)" />
                    ))}
                  </div>
                  <blockquote className="mb-0">
                    <p className="mb-0 fst-italic">"{testimonial.quote}"</p>
                  </blockquote>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className={`text-center mt-4 ${isVisible ? 'animate-fade-up animate-delay-4' : 'opacity-0'}`}>
          <Col>
            <Button variant="outline-dark" className="hover-lift">
              See All Success Stories <ArrowRight size={16} className="ms-2" />
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialsSection;