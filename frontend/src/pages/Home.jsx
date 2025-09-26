import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import { GraduationCap, BookOpen, Briefcase, ArrowRight } from 'lucide-react';

const Home = () => {
  const services = [
    {
      icon: GraduationCap,
      title: "Study Abroad",
      description: "Complete guidance for Japanese university admissions, scholarships, and student visa processing."
    },
    {
      icon: BookOpen,
      title: "Language Classes",
      description: "Expert Japanese language training from beginner to advanced levels with certified instructors."
    },
    {
      icon: Briefcase,
      title: "Working Visa Support",
      description: "Professional assistance for work visa applications and job placement in Japan."
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      image: "/api/placeholder/60/60",
      quote: "Sakura Japan made my dream of studying at Tokyo University come true. Their guidance was invaluable.",
      rating: 5,
      destination: "Tokyo University",
      program: "Computer Science"
    },
    {
      name: "Raj Patel",
      image: "/api/placeholder/60/60",
      quote: "The language classes were excellent. I passed JLPT N2 within 8 months of starting here.",
      rating: 5,
      destination: "Osaka",
      program: "Japanese Language"
    },
    {
      name: "Anita Gurung",
      image: "/api/placeholder/60/60",
      quote: "Professional visa support helped me secure a job at a top Japanese company. Highly recommended!",
      rating: 5,
      destination: "Kyoto",
      program: "Work Visa"
    }
  ];

  return (
    <>
      <Hero />
      
      {/* Services Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold mb-3">Our Services</h2>
              <p className="lead text-muted">Three pillars of your Japanese journey</p>
            </Col>
          </Row>
          <Row>
            {services.map((service, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <ServiceCard {...service} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-surface-alt">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold mb-3">Success Stories</h2>
              <p className="lead text-muted">What our students say about us</p>
            </Col>
          </Row>
          <Row>
            {testimonials.map((testimonial, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <TestimonialCard {...testimonial} />
              </Col>
            ))}
          </Row>
          <Row className="text-center mt-4">
            <Col>
              <Button variant="outline-dark">
                See Success Stories <ArrowRight size={16} className="ms-2" />
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h2 className="fw-bold mb-3">Ready to Start Your Japan Journey?</h2>
              <p className="lead text-muted mb-4">
                Book a free consultation with our experts and take the first step towards your Japanese dream.
              </p>
              <Button className="btn-accent-red btn-lg">Book Free Counseling</Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;