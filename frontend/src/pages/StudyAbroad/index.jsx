import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { GraduationCap, Award, Users, CheckCircle, Globe, BookOpen } from 'lucide-react';
import { universityAPI } from '../../services/api';

const StudyAbroad = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const response = await universityAPI.getAll();
      setUniversities(response.data.data);
    } catch (error) {
      console.error('Error fetching universities:', error);
      // Fallback data
      setUniversities([
        {
          name: "University of Tokyo",
          location: "Tokyo",
          ranking: "#1 in Japan",
          image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",
          programs: ["Engineering", "Medicine", "Business"],
          tuitionFee: { min: 535800, max: 1200000 }
        },
        {
          name: "Kyoto University",
          location: "Kyoto", 
          ranking: "#2 in Japan",
          image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=300&h=200&fit=crop",
          programs: ["Science", "Arts", "Law"],
          tuitionFee: { min: 535800, max: 1000000 }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const processSteps = [
    { step: 1, title: "Free Consultation", desc: "Assess your profile and goals", icon: Users },
    { step: 2, title: "University Selection", desc: "Choose the best fit universities", icon: GraduationCap },
    { step: 3, title: "Application Support", desc: "Complete application process", icon: BookOpen },
    { step: 4, title: "Visa Processing", desc: "Student visa assistance", icon: Globe }
  ];

  const benefits = [
    "World-class education system",
    "Cutting-edge research opportunities",
    "Rich cultural experience",
    "Strong job market post-graduation",
    "Scholarship opportunities available",
    "Safe and welcoming environment"
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-surface-alt position-relative overflow-hidden">
        <div className="position-absolute" style={{ top: '20%', right: '10%', fontSize: '60px', opacity: 0.1, animation: 'float 8s ease-in-out infinite' }}>🎓</div>
        <div className="position-absolute" style={{ bottom: '20%', left: '10%', fontSize: '80px', opacity: 0.1, animation: 'float 6s ease-in-out infinite 2s' }}>🗾</div>
        
        <Container>
          <Row className={`text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <Col lg={8} className="mx-auto">
              <h1 className="fw-bold mb-4">Study Abroad in Japan</h1>
              <p className="lead text-muted mb-4">
                Your gateway to world-class Japanese education and cultural immersion. 
                Join thousands of international students pursuing their dreams in Japan.
              </p>
              <Button className="btn-accent-red btn-lg me-3" href="/contact">Start Your Journey</Button>
              <Button variant="outline-dark" className="btn-lg" href="/scholarships">View Scholarships</Button>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        {/* Why Study in Japan */}
        <Row className={`mb-5 ${isVisible ? 'animate-fade-up animate-delay-1' : 'opacity-0'}`}>
          <Col>
            <h2 className="text-center fw-bold mb-4">Why Study in Japan?</h2>
            <Row>
              <Col lg={6} className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=500&h=300&fit=crop" 
                  alt="Japanese University" 
                  className="img-fluid rounded-xl shadow-lg"
                />
              </Col>
              <Col lg={6}>
                <div className="ps-lg-4">
                  <h4 className="fw-bold mb-3">Benefits of Studying in Japan</h4>
                  {benefits.map((benefit, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                      <CheckCircle size={16} className="me-2" style={{ color: 'var(--brand-accent-red)' }} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                  <Button className="btn-accent-red mt-3" href="/living-guide">Learn About Life in Japan</Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Process Steps */}
        <Row className={`mb-5 ${isVisible ? 'animate-fade-up animate-delay-2' : 'opacity-0'}`}>
          <Col>
            <h2 className="text-center fw-bold mb-4">Our Study Abroad Process</h2>
            <Row>
              {processSteps.map((item, index) => (
                <Col md={3} className="text-center mb-4" key={index}>
                  <div 
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 hover-glow"
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      backgroundColor: 'var(--brand-accent-red)',
                      color: 'white'
                    }}
                  >
                    <item.icon size={32} />
                  </div>
                  <h5 className="fw-bold">{item.title}</h5>
                  <p className="text-muted small">{item.desc}</p>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Top Universities */}
        <Row className={`mb-5 ${isVisible ? 'animate-fade-up animate-delay-3' : 'opacity-0'}`}>
          <Col>
            <h2 className="text-center fw-bold mb-4">Top Universities in Japan</h2>
            <Row>
              {universities.map((uni, index) => (
                <Col lg={4} md={6} className="mb-4" key={index}>
                  <Card className="border-0 shadow-sm h-100 hover-lift">
                    <Card.Img variant="top" src={uni.image} style={{ height: '200px', objectFit: 'cover' }} />
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title className="h5">{uni.name}</Card.Title>
                        <Badge style={{ backgroundColor: 'var(--brand-accent-pink)', color: 'var(--brand-primary-dark)' }}>
                          {uni.ranking}
                        </Badge>
                      </div>
                      <p className="text-muted small mb-3">{uni.location}</p>
                      <div className="mb-3">
                        {uni.programs?.map((program, idx) => (
                          <Badge key={idx} bg="light" text="dark" className="me-1 mb-1">
                            {program}
                          </Badge>
                        ))}
                      </div>
                      {uni.tuitionFee && (
                        <p className="small text-muted mb-3">
                          Tuition: ¥{uni.tuitionFee.min?.toLocaleString()} - ¥{uni.tuitionFee.max?.toLocaleString()}/year
                        </p>
                      )}
                      <Button variant="outline-dark" size="sm" href="/destinations">Learn More</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="text-center mt-4">
              <Button variant="outline-dark" href="/destinations">View All Universities</Button>
            </div>
          </Col>
        </Row>

        {/* CTA */}
        <Row className={`text-center ${isVisible ? 'animate-fade-up animate-delay-4' : 'opacity-0'}`}>
          <Col lg={8} className="mx-auto">
            <div className="bg-surface-alt p-5 rounded-xl">
              <h3 className="fw-bold mb-3">Ready to Start Your Journey?</h3>
              <p className="text-muted mb-4">
                Book a free consultation to discuss your study abroad plans and get personalized guidance.
              </p>
              <Button className="btn-accent-red btn-lg me-3" href="/contact">Book Free Consultation</Button>
              <Button variant="outline-dark" className="btn-lg" href="/enroll">Apply for Classes</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StudyAbroad;