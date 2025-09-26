import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const Events = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const events = [
    {
      id: 1,
      title: "Japan Education Fair 2024",
      description: "Meet representatives from top Japanese universities and learn about admission requirements, scholarships, and campus life.",
      date: "2024-02-15",
      time: "10:00 AM - 4:00 PM",
      location: "Hotel Yak & Yeti, Kathmandu",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
      type: "Education Fair",
      attendees: 200,
      status: "upcoming"
    },
    {
      id: 2,
      title: "JLPT Preparation Workshop",
      description: "Intensive workshop covering N5 to N2 levels with practice tests and expert guidance from native Japanese instructors.",
      date: "2024-02-20",
      time: "9:00 AM - 5:00 PM",
      location: "Sakura Japan Office",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
      type: "Workshop",
      attendees: 50,
      status: "upcoming"
    },
    {
      id: 3,
      title: "Student Success Stories Session",
      description: "Hear from our successful students currently studying and working in Japan. Q&A session included.",
      date: "2024-01-25",
      time: "2:00 PM - 4:00 PM",
      location: "Online (Zoom)",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      type: "Webinar",
      attendees: 150,
      status: "completed"
    },
    {
      id: 4,
      title: "Japanese Culture Festival",
      description: "Experience Japanese culture through traditional performances, food, and cultural activities. Family-friendly event.",
      date: "2024-03-10",
      time: "11:00 AM - 6:00 PM",
      location: "Nepal Academy Hall",
      image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=250&fit=crop",
      type: "Cultural Event",
      attendees: 300,
      status: "upcoming"
    }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      upcoming: { bg: 'var(--brand-accent-red)', color: 'white' },
      completed: { bg: 'var(--brand-accent-pink)', color: 'var(--brand-primary-dark)' },
      cancelled: { bg: '#6c757d', color: 'white' }
    };
    return variants[status] || variants.upcoming;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-surface-alt">
        <Container>
          <Row className={`text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <Col>
              <h1 className="fw-bold mb-4">Events & Workshops</h1>
              <p className="lead text-muted">
                Join our events to learn more about studying and working in Japan
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        <Row>
          {events.map((event, index) => (
            <Col lg={6} className={`mb-4 ${isVisible ? `animate-fade-up animate-delay-${index + 1}` : 'opacity-0'}`} key={event.id}>
              <Card className="border-0 shadow-sm h-100 hover-lift">
                <div className="position-relative">
                  <Card.Img 
                    variant="top" 
                    src={event.image}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <Badge 
                      style={getStatusBadge(event.status)}
                    >
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="position-absolute top-0 start-0 m-2">
                    <Badge 
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: 'var(--brand-primary-dark)'
                      }}
                    >
                      {event.type}
                    </Badge>
                  </div>
                </div>
                <Card.Body className="p-4">
                  <Card.Title className="h5 mb-3">{event.title}</Card.Title>
                  <Card.Text className="text-muted mb-3">
                    {event.description}
                  </Card.Text>
                  
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2 text-muted small">
                      <Calendar size={16} className="me-2" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2 text-muted small">
                      <Clock size={16} className="me-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2 text-muted small">
                      <MapPin size={16} className="me-2" />
                      <span>{event.location}</span>
                    </div>
                    <div className="d-flex align-items-center text-muted small">
                      <Users size={16} className="me-2" />
                      <span>{event.attendees} expected attendees</span>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    {event.status === 'upcoming' ? (
                      <Button className="btn-accent-red">
                        Register Now
                      </Button>
                    ) : (
                      <Button variant="outline-secondary" disabled>
                        Event Completed
                      </Button>
                    )}
                    <Button variant="link" className="p-0 text-decoration-none">
                      Learn More
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* CTA Section */}
        <Row className={`mt-5 pt-5 text-center ${isVisible ? 'animate-fade-up animate-delay-5' : 'opacity-0'}`}>
          <Col lg={8} className="mx-auto">
            <div className="bg-surface-alt p-5 rounded-xl">
              <h3 className="fw-bold mb-3">Don't Miss Our Events!</h3>
              <p className="text-muted mb-4">
                Subscribe to our newsletter to get notified about upcoming events and workshops.
              </p>
              <Button className="btn-accent-red">Subscribe to Newsletter</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Events;