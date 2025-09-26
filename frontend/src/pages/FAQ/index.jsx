import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Accordion, Button } from 'react-bootstrap';
import { MessageCircle } from 'lucide-react';

const FAQ = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const faqs = [
    {
      question: "What are the requirements for studying in Japan?",
      answer: "Basic requirements include completion of 12 years of education, basic Japanese language proficiency (N5 level minimum), financial capability, and a clean academic record. Specific requirements may vary by university and program."
    },
    {
      question: "How long does the visa application process take?",
      answer: "The student visa process typically takes 3-4 months from application submission to visa approval. This includes document preparation, university application, COE processing, and visa application at the Japanese embassy."
    },
    {
      question: "What is the cost of studying in Japan?",
      answer: "Tuition fees range from ¥500,000 to ¥1,500,000 per year depending on the institution. Living expenses average ¥100,000-150,000 per month. We provide detailed cost breakdowns during consultation."
    },
    {
      question: "Do you provide scholarship guidance?",
      answer: "Yes, we assist with various scholarship applications including MEXT, JASSO, and university-specific scholarships. Our team helps identify suitable scholarships and guides you through the application process."
    },
    {
      question: "Can I work while studying in Japan?",
      answer: "Yes, international students can work up to 28 hours per week with a work permit. We provide guidance on obtaining work permits and finding part-time employment opportunities."
    },
    {
      question: "What Japanese language level do I need?",
      answer: "Minimum N5 level is required for most programs. However, N4 or N3 level is recommended for better academic performance. We offer comprehensive Japanese language classes to help you achieve the required level."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-surface-alt">
        <Container>
          <Row className={`text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <Col lg={8} className="mx-auto">
              <h1 className="fw-bold mb-4">Frequently Asked Questions</h1>
              <p className="lead text-muted">
                Find answers to common questions about studying and working in Japan
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        <Row>
          <Col lg={8} className="mx-auto">
            <Accordion className={`${isVisible ? 'animate-fade-up animate-delay-1' : 'opacity-0'}`}>
              {faqs.map((faq, index) => (
                <Accordion.Item eventKey={index.toString()} key={index} className="mb-3 border-0 shadow-sm rounded-xl">
                  <Accordion.Header>
                    <span className="fw-semibold">{faq.question}</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className="text-muted mb-0">{faq.answer}</p>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>

            <div className={`text-center mt-5 p-4 bg-surface-alt rounded-xl ${isVisible ? 'animate-fade-up animate-delay-2' : 'opacity-0'}`}>
              <MessageCircle size={48} className="mb-3" style={{ color: 'var(--brand-accent-red)' }} />
              <h4 className="fw-bold mb-3">Didn't find your answer?</h4>
              <p className="text-muted mb-3">
                Our expert counselors are here to help with any specific questions you may have.
              </p>
              <Button className="btn-accent-red">Contact Our Experts</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FAQ;