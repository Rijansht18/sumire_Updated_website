import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Accordion } from 'react-bootstrap';
import { Home, CreditCard, Train, Utensils, Wifi, Phone, Heart, Users, MapPin, Clock } from 'lucide-react';

const LivingGuide = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const essentialInfo = [
    {
      icon: Home,
      title: "Housing",
      description: "Finding apartments, dormitories, and shared housing options",
      details: [
        "Average rent: ¥50,000-150,000/month",
        "Key money and deposits required",
        "Furnished vs unfurnished options",
        "Guarantor system for rentals"
      ]
    },
    {
      icon: CreditCard,
      title: "Banking & Money",
      description: "Opening bank accounts and managing finances",
      details: [
        "Major banks: MUFG, Mizuho, SMBC",
        "Cash-based society",
        "IC cards for transportation",
        "International money transfers"
      ]
    },
    {
      icon: Train,
      title: "Transportation",
      description: "Navigating Japan's efficient public transport system",
      details: [
        "JR Pass for long-distance travel",
        "IC cards: Suica, Pasmo",
        "Bicycle registration required",
        "Punctual and reliable services"
      ]
    },
    {
      icon: Phone,
      title: "Communication",
      description: "Mobile phones, internet, and staying connected",
      details: [
        "Major carriers: NTT Docomo, SoftBank, au",
        "Pocket WiFi options available",
        "Free WiFi in many public places",
        "LINE app widely used"
      ]
    }
  ];

  const culturalTips = [
    {
      title: "Bowing & Greetings",
      description: "Bowing is common for greetings, apologies, and thanks. Depth varies by situation."
    },
    {
      title: "Shoes Off Indoors",
      description: "Remove shoes when entering homes, some restaurants, and traditional buildings."
    },
    {
      title: "Quiet Public Spaces",
      description: "Keep conversations quiet on trains and in public spaces. Phone calls are discouraged."
    },
    {
      title: "Gift Giving (Omiyage)",
      description: "Bringing small gifts when visiting someone or returning from trips is customary."
    },
    {
      title: "Punctuality",
      description: "Being on time is extremely important. Arrive a few minutes early for appointments."
    },
    {
      title: "Trash Separation",
      description: "Strict recycling rules. Separate burnable, non-burnable, plastic, and recyclables."
    }
  ];

  const costOfLiving = [
    { category: "Rent (1-bedroom)", tokyo: "¥80,000-150,000", osaka: "¥60,000-100,000", kyoto: "¥55,000-90,000" },
    { category: "Utilities", tokyo: "¥10,000-15,000", osaka: "¥8,000-12,000", kyoto: "¥8,000-12,000" },
    { category: "Food (monthly)", tokyo: "¥40,000-60,000", osaka: "¥35,000-50,000", kyoto: "¥35,000-50,000" },
    { category: "Transportation", tokyo: "¥10,000-15,000", osaka: "¥8,000-12,000", kyoto: "¥6,000-10,000" },
    { category: "Mobile Phone", tokyo: "¥3,000-8,000", osaka: "¥3,000-8,000", kyoto: "¥3,000-8,000" }
  ];

  const emergencyInfo = [
    { service: "Police", number: "110", description: "For crimes and emergencies" },
    { service: "Fire/Ambulance", number: "119", description: "For fires and medical emergencies" },
    { service: "Tourist Hotline", number: "050-3816-2787", description: "24/7 support in multiple languages" }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-surface-alt position-relative overflow-hidden">
        <div className="position-absolute" style={{ top: '20%', right: '10%', fontSize: '60px', opacity: 0.1, animation: 'float 8s ease-in-out infinite' }}>🏠</div>
        <div className="position-absolute" style={{ bottom: '20%', left: '10%', fontSize: '80px', opacity: 0.1, animation: 'float 6s ease-in-out infinite 2s' }}>🗾</div>
        
        <Container>
          <Row className={`text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <Col lg={8} className="mx-auto">
              <h1 className="fw-bold mb-4">Living in Japan Guide</h1>
              <p className="lead text-muted mb-4">
                Everything you need to know about daily life in Japan. From housing and banking 
                to cultural etiquette and emergency contacts - your complete survival guide.
              </p>
              <Button className="btn-accent-red btn-lg me-3" href="/contact">Get Personal Guidance</Button>
              <Button variant="outline-dark" className="btn-lg" href="/study-abroad">Study Abroad Info</Button>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        {/* Essential Information */}
        <Row className={`mb-5 ${isVisible ? 'animate-fade-up animate-delay-1' : 'opacity-0'}`}>
          <Col>
            <h2 className="text-center fw-bold mb-4">Essential Living Information</h2>
            <Row>
              {essentialInfo.map((info, index) => (
                <Col lg={3} md={6} className="mb-4" key={index}>
                  <Card className="border-0 shadow-sm h-100 hover-lift">
                    <Card.Body className="p-4 text-center">
                      <div 
                        className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          backgroundColor: 'var(--brand-accent-pink)',
                          color: 'var(--brand-primary-dark)'
                        }}
                      >
                        <info.icon size={24} />
                      </div>
                      <Card.Title className="h5 mb-3">{info.title}</Card.Title>
                      <Card.Text className="text-muted small mb-3">{info.description}</Card.Text>
                      <div className="text-start">
                        {info.details.map((detail, idx) => (
                          <div key={idx} className="small text-muted mb-1">
                            • {detail}
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Cost of Living */}
        <Row className={`mb-5 ${isVisible ? 'animate-fade-up animate-delay-2' : 'opacity-0'}`}>
          <Col>
            <h2 className="text-center fw-bold mb-4">Cost of Living Comparison</h2>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Tokyo</th>
                        <th>Osaka</th>
                        <th>Kyoto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costOfLiving.map((item, index) => (
                        <tr key={index}>
                          <td className="fw-semibold">{item.category}</td>
                          <td>{item.tokyo}</td>
                          <td>{item.osaka}</td>
                          <td>{item.kyoto}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 text-center">
                  <small className="text-muted">*Prices are approximate and may vary by location and season</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Cultural Tips */}
        <Row className={`mb-5 ${isVisible ? 'animate-fade-up animate-delay-3' : 'opacity-0'}`}>
          <Col>
            <h2 className="text-center fw-bold mb-4">Cultural Etiquette & Tips</h2>
            <Row>
              {culturalTips.map((tip, index) => (
                <Col lg={4} md={6} className="mb-4" key={index}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-center mb-3">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{ 
                            width: '40px', 
                            height: '40px', 
                            backgroundColor: 'var(--brand-accent-red)',
                            color: 'white'
                          }}
                        >
                          <Heart size={16} />
                        </div>
                        <Card.Title className="h6 mb-0">{tip.title}</Card.Title>
                      </div>
                      <Card.Text className="text-muted small">{tip.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Emergency Information */}
        <Row className={`mb-5 ${isVisible ? 'animate-fade-up animate-delay-4' : 'opacity-0'}`}>
          <Col lg={8} className="mx-auto">
            <Card className="border-0 shadow-sm" style={{ backgroundColor: '#fff5f5' }}>
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3 text-center" style={{ color: 'var(--brand-accent-red)' }}>Emergency Contacts</h4>
                <Row>
                  {emergencyInfo.map((emergency, index) => (
                    <Col md={4} className="text-center mb-3" key={index}>
                      <div className="mb-2">
                        <div className="fw-bold" style={{ color: 'var(--brand-accent-red)' }}>{emergency.service}</div>
                        <div className="h4 fw-bold">{emergency.number}</div>
                        <small className="text-muted">{emergency.description}</small>
                      </div>
                    </Col>
                  ))}
                </Row>
                <div className="text-center mt-3">
                  <small className="text-muted">
                    <strong>Important:</strong> Save these numbers in your phone and keep them easily accessible
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* FAQ Section */}
        <Row className={`mb-5 ${isVisible ? 'animate-fade-up animate-delay-5' : 'opacity-0'}`}>
          <Col lg={8} className="mx-auto">
            <h2 className="text-center fw-bold mb-4">Frequently Asked Questions</h2>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Do I need to speak Japanese to live in Japan?</Accordion.Header>
                <Accordion.Body>
                  While basic Japanese is helpful for daily life, many services in major cities have English support. 
                  Learning basic phrases will greatly improve your experience and help with integration.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>How do I open a bank account?</Accordion.Header>
                <Accordion.Body>
                  You'll need your residence card, passport, personal seal (hanko), and proof of address. 
                  Some banks offer English services for international customers.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>What about healthcare and insurance?</Accordion.Header>
                <Accordion.Body>
                  All residents must enroll in National Health Insurance (Kokumin Kenko Hoken) which covers 70% of medical costs. 
                  The remaining 30% is your responsibility.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>How do I find housing?</Accordion.Header>
                <Accordion.Body>
                  Use real estate agencies, online platforms like Suumo, or ask your school/employer for assistance. 
                  Be prepared for key money, deposits, and guarantor requirements.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>

        {/* CTA */}
        <Row className={`text-center ${isVisible ? 'animate-fade-up animate-delay-6' : 'opacity-0'}`}>
          <Col lg={8} className="mx-auto">
            <div className="bg-surface-alt p-5 rounded-xl">
              <h3 className="fw-bold mb-3">Need Personalized Support?</h3>
              <p className="text-muted mb-4">
                Our team provides comprehensive support for international students and workers, 
                from pre-arrival preparation to settling in Japan.
              </p>
              <Button className="btn-accent-red btn-lg me-3" href="/contact">Get Support</Button>
              <Button variant="outline-dark" className="btn-lg" href="/work-visa">Work Visa Info</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LivingGuide;