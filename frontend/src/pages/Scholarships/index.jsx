import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Award, Calendar, Users, ExternalLink } from 'lucide-react';
import { scholarshipAPI } from '../../services/api';

const Scholarships = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const response = await scholarshipAPI.getAll();
      setScholarships(response.data.data);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      // Fallback data
      setScholarships([
        {
          name: "MEXT Scholarship",
          provider: "Japanese Government",
          amount: "Full tuition + Monthly allowance ¥143,000",
          deadline: "2024-05-31",
          description: "The most prestigious scholarship for international students in Japan.",
          eligibility: ["Bachelor's degree", "Under 35 years", "Strong academic record"],
          requirements: ["Academic transcripts", "Research proposal", "Language proficiency"]
        },
        {
          name: "JASSO Scholarship",
          provider: "Japan Student Services Organization",
          amount: "¥48,000 - ¥80,000 per month",
          deadline: "2024-04-15",
          description: "Support for international students with excellent academic performance.",
          eligibility: ["Enrolled in Japanese university", "GPA 2.30 or above", "Financial need"],
          requirements: ["Application form", "Academic records", "Financial documents"]
        },
        {
          name: "University of Tokyo Scholarship",
          provider: "University of Tokyo",
          amount: "¥100,000 per month",
          deadline: "2024-03-31",
          description: "Merit-based scholarship for outstanding international students.",
          eligibility: ["Admitted to UTokyo", "Excellent academic record", "Research potential"],
          requirements: ["Admission letter", "Research plan", "Recommendation letters"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const scholarshipTypes = [
    {
      title: "Government Scholarships",
      description: "MEXT and other government-funded programs",
      icon: Award,
      color: "var(--brand-accent-red)"
    },
    {
      title: "University Scholarships",
      description: "Institution-specific funding opportunities",
      icon: Users,
      color: "var(--brand-accent-pink)"
    },
    {
      title: "Private Scholarships",
      description: "Corporate and foundation scholarships",
      icon: ExternalLink,
      color: "var(--brand-primary-dark)"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-surface-alt position-relative overflow-hidden">
        <div className="position-absolute" style={{ top: '20%', right: '10%', fontSize: '60px', opacity: 0.1, animation: 'float 8s ease-in-out infinite' }}>🏆</div>
        <div className="position-absolute" style={{ bottom: '20%', left: '10%', fontSize: '80px', opacity: 0.1, animation: 'float 6s ease-in-out infinite 2s' }}>💰</div>
        
        <Container>
          <Row className={`text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <Col lg={8} className="mx-auto">
              <h1 className="fw-bold mb-4">Scholarships for Japan</h1>
              <p className="lead text-muted mb-4">
                Find funding opportunities for your Japanese education. From government scholarships 
                to university-specific grants, we help you secure financial support.
              </p>
              <Button className="btn-accent-red btn-lg" href="/contact">Get Scholarship Guidance</Button>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        {/* Scholarship Types */}
        <Row className={`mb-5 ${isVisible ? 'animate-fade-up animate-delay-1' : 'opacity-0'}`}>
          <Col>
            <h2 className="text-center fw-bold mb-4">Types of Scholarships</h2>
            <Row>
              {scholarshipTypes.map((type, index) => (
                <Col lg={4} md={6} className="mb-4" key={index}>
                  <Card className="border-0 shadow-sm h-100 hover-lift text-center">
                    <Card.Body className="p-4">
                      <div 
                        className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          backgroundColor: type.color,
                          color: 'white'
                        }}
                      >
                        <type.icon size={24} />
                      </div>
                      <h5 className="fw-bold mb-3">{type.title}</h5>
                      <p className="text-muted">{type.description}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Available Scholarships */}
        <Row className={`mb-5 ${isVisible ? 'animate-fade-up animate-delay-2' : 'opacity-0'}`}>
          <Col>
            <h2 className="text-center fw-bold mb-4">Available Scholarships</h2>
            <Row>
              {scholarships.map((scholarship, index) => (
                <Col lg={4} md={6} className="mb-4" key={index}>
                  <Card className="border-0 shadow-sm h-100 hover-lift">
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <Card.Title className="h5">{scholarship.name}</Card.Title>
                        <Badge style={{ backgroundColor: 'var(--brand-accent-pink)', color: 'var(--brand-primary-dark)' }}>
                          {scholarship.provider}
                        </Badge>
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <Award size={16} className="me-2" style={{ color: 'var(--brand-accent-red)' }} />
                          <strong className="small">{scholarship.amount}</strong>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <Calendar size={16} className="me-2" style={{ color: 'var(--brand-accent-red)' }} />
                          <small className="text-muted">
                            Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                      
                      <p className="text-muted small mb-3">{scholarship.description}</p>
                      
                      <div className="mb-3">
                        <h6 className="fw-semibold small">Eligibility:</h6>
                        <ul className="small text-muted mb-0">
                          {scholarship.eligibility?.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button variant="outline-dark" size="sm" className="w-100">
                        Learn More <ExternalLink size={14} className="ms-1" />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Application Tips */}
        <Row className={`mb-5 ${isVisible ? 'animate-fade-up animate-delay-3' : 'opacity-0'}`}>
          <Col lg={8} className="mx-auto">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3 text-center">Scholarship Application Tips</h4>
                <Row>
                  <Col md={6}>
                    <h6 className="fw-semibold">Before Applying:</h6>
                    <ul className="small">
                      <li>Research eligibility criteria thoroughly</li>
                      <li>Prepare required documents early</li>
                      <li>Check application deadlines</li>
                      <li>Understand selection criteria</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h6 className="fw-semibold">Application Success:</h6>
                    <ul className="small">
                      <li>Write compelling personal statements</li>
                      <li>Get strong recommendation letters</li>
                      <li>Demonstrate financial need clearly</li>
                      <li>Show academic excellence</li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* CTA */}
        <Row className={`text-center ${isVisible ? 'animate-fade-up animate-delay-4' : 'opacity-0'}`}>
          <Col lg={8} className="mx-auto">
            <div className="bg-surface-alt p-5 rounded-xl">
              <h3 className="fw-bold mb-3">Need Help with Scholarship Applications?</h3>
              <p className="text-muted mb-4">
                Our experts can guide you through the scholarship application process and 
                help you find the best funding opportunities for your studies.
              </p>
              <Button className="btn-accent-red btn-lg me-3" href="/contact">Get Expert Help</Button>
              <Button variant="outline-dark" className="btn-lg" href="/study-abroad">Study Abroad Info</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Scholarships;