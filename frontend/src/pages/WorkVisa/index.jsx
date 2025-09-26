import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table } from 'react-bootstrap';
import { Briefcase, CheckCircle, Clock, Users, FileText, Award } from 'lucide-react';

const WorkVisa = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const visaTypes = [
    {
      name: "Engineer/Specialist in Humanities/International Services",
      description: "For IT professionals, engineers, translators, and international business specialists",
      requirements: ["Bachelor's degree", "Job offer from Japanese company", "Relevant work experience"],
      duration: "1-5 years",
      renewable: true
    },
    {
      name: "Skilled Labor",
      description: "For workers in specific industries with technical skills",
      requirements: ["Technical certification", "Japanese language proficiency", "Industry experience"],
      duration: "1-5 years",
      renewable: true
    },
    {
      name: "Intra-company Transferee",
      description: "For employees transferred from overseas offices to Japanese branches",
      requirements: ["Employment with multinational company", "1+ years experience", "Transfer documentation"],
      duration: "1-5 years",
      renewable: true
    }
  ];

  const applicationProcess = [
    { step: 1, title: "Job Search", desc: "Find employment with Japanese company", icon: Briefcase },
    { step: 2, title: "Document Preparation", desc: "Gather required certificates and documents", icon: FileText },
    { step: 3, title: "COE Application", desc: "Employer applies for Certificate of Eligibility", icon: Clock },
    { step: 4, title: "Visa Application", desc: "Apply for work visa at Japanese embassy", icon: Award }
  ];

  const benefits = [
    "Work legally in Japan with full employment rights",
    "Bring spouse and children on dependent visas",
    "Access to Japanese healthcare system",
    "Opportunity to apply for permanent residency",
    "Professional development in Japanese market",
    "Cultural immersion and language learning"
  ];

  const requiredDocuments = [
    "Valid passport",
    "University degree certificates",
    "Employment contract from Japanese company",
    "Certificate of Eligibility (COE)",
    "Visa application form",
    "Passport-sized photographs",
    "Resume/CV",
    "Academic transcripts"
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-surface-alt position-relative overflow-hidden">
        <div className="position-absolute" style={{ top: '20%', right: '10%', fontSize: '60px', opacity: 0.1, animation: 'float 8s ease-in-out infinite' }}>💼</div>
        <div className="position-absolute" style={{ bottom: '20%', left: '10%', fontSize: '80px', opacity: 0.1, animation: 'float 6s ease-in-out infinite 2s' }}>🗾</div>
        
        <Container>
          <Row className={`text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <Col lg={8} className="mx-auto">
              <h1 className="fw-bold mb-4">Work Visa Support for Japan</h1>
              <p className="lead text-muted mb-4">
                Professional assistance for securing work visas and building your career in Japan. 
                From job placement to visa processing, we guide you through every step.
              </p>
              <Button className="btn-accent-red btn-lg me-3" href="/contact">Get Visa Support</Button>
              <Button variant="outline-dark" className="btn-lg" href="/living-guide">Living in Japan Guide</Button>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        {/* Work Visa Types */}
        <Row className={`mb-5 ${isVisible ? 'animate-fade-up animate-delay-1' : 'opacity-0'}`}>
          <Col>
            <h2 className="text-center fw-bold mb-4">Types of Work Visas</h2>
            <Row>
              {visaTypes.map((visa, index) => (
                <Col lg={4} md={6} className="mb-4" key={index}>
                  <Card className="border-0 shadow-sm h-100 hover-lift">
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-center mb-3">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{ 
                            width: '50px', 
                            height: '50px', 
                            backgroundColor: 'var(--brand-accent-pink)',
                            color: 'var(--brand-primary-dark)'
                          }}
                        >
                          <Briefcase size={20} />
                        </div>
                        <div>
                          <Badge style={{ backgroundColor: 'var(--brand-accent-red)', color: 'white' }}>
                            {visa.duration}
                          </Badge>
                        </div>
                      </div>
                      <Card.Title className="h5 mb-3">{visa.name}</Card.Title>
                      <Card.Text className="text-muted mb-3">{visa.description}</Card.Text>
                      <div className="mb-3">
                        <h6 className="fw-semibold small">Requirements:</h6>
                        <ul className="small text-muted mb-0">
                          {visa.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      {visa.renewable && (
                        <Badge bg="success" className="small">Renewable</Badge>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Application Process */}
        <Row className={`mb-5 ${isVisible ? 'animate-fade-up animate-delay-2' : 'opacity-0'}`}>
          <Col>
            <h2 className="text-center fw-bold mb-4">Work Visa Application Process</h2>
            <Row>
              {applicationProcess.map((item, index) => (
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

        {/* Benefits and Documents */}
        <Row className={`mb-5 ${isVisible ? 'animate-fade-up animate-delay-3' : 'opacity-0'}`}>
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3">Benefits of Working in Japan</h4>
                {benefits.map((benefit, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <CheckCircle size={16} className="me-2" style={{ color: 'var(--brand-accent-red)' }} />
                    <span className="small">{benefit}</span>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3">Required Documents</h4>
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <FileText size={16} className="me-2" style={{ color: 'var(--brand-accent-red)' }} />
                    <span className="small">{doc}</span>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Processing Times */}
        <Row className={`mb-5 ${isVisible ? 'animate-fade-up animate-delay-4' : 'opacity-0'}`}>
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3 text-center">Processing Timeline</h4>
                <Table responsive className="mb-0">
                  <thead>
                    <tr>
                      <th>Stage</th>
                      <th>Duration</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Job Search</td>
                      <td>1-6 months</td>
                      <td>Finding suitable employment in Japan</td>
                    </tr>
                    <tr>
                      <td>COE Application</td>
                      <td>1-3 months</td>
                      <td>Employer applies for Certificate of Eligibility</td>
                    </tr>
                    <tr>
                      <td>Visa Application</td>
                      <td>5-10 days</td>
                      <td>Apply for work visa at Japanese embassy</td>
                    </tr>
                    <tr>
                      <td>Total Process</td>
                      <td className="fw-bold">3-10 months</td>
                      <td>Complete process from job search to visa approval</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* CTA */}
        <Row className={`text-center ${isVisible ? 'animate-fade-up animate-delay-5' : 'opacity-0'}`}>
          <Col lg={8} className="mx-auto">
            <div className="bg-surface-alt p-5 rounded-xl">
              <h3 className="fw-bold mb-3">Ready to Work in Japan?</h3>
              <p className="text-muted mb-4">
                Our experts will guide you through the entire work visa process, from job placement 
                to visa approval. Get personalized support for your Japanese career journey.
              </p>
              <Button className="btn-accent-red btn-lg me-3" href="/contact">Get Expert Support</Button>
              <Button variant="outline-dark" className="btn-lg" href="/study-abroad">Study Options</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WorkVisa;