import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const StorySection = () => {
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

    const section = document.getElementById('story-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="story-section" className="py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className={`mb-4 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <h2 className="fw-bold mb-3">Our Story</h2>
            <p className="text-muted mb-3">
              Founded in 2015, Sakura Japan Consultancy emerged from a simple belief: 
              that quality education and career opportunities in Japan should be accessible 
              to everyone with the right guidance and support.
            </p>
            <p className="text-muted mb-3">
              Our founders, having experienced the challenges of studying and working in Japan 
              firsthand, established this consultancy to bridge the gap between Nepalese 
              aspirations and Japanese opportunities.
            </p>
            <p className="text-muted">
              Today, we're proud to have helped over 2,500 students and professionals 
              achieve their Japanese dreams, with a 95% visa success rate.
            </p>
          </Col>
          <Col lg={6} className={`${isVisible ? 'animate-fade-up animate-delay-2' : 'opacity-0'}`}>
            <img 
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&h=300&fit=crop" 
              alt="Our Office in Kathmandu" 
              className="img-fluid rounded-xl shadow-lg"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default StorySection;