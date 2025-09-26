import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal, Badge, Button } from 'react-bootstrap';
import { Play, X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const galleryItems = [
    {
      id: 1,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
      title: 'Students at Tokyo University',
      category: 'students',
      description: 'Our students enjoying their time at Tokyo University campus'
    },
    {
      id: 2,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
      title: 'Japanese Language Class',
      category: 'classes',
      description: 'Interactive Japanese language learning session'
    },
    {
      id: 3,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop',
      title: 'Japan Arrival Experience',
      category: 'arrivals',
      description: 'Students sharing their first day in Japan'
    },
    {
      id: 4,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop',
      title: 'Cultural Festival',
      category: 'events',
      description: 'Participating in traditional Japanese festivals'
    },
    {
      id: 5,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=300&fit=crop',
      title: 'Office in Kathmandu',
      category: 'office',
      description: 'Our modern office space in Kathmandu'
    },
    {
      id: 6,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      title: 'Graduation Ceremony',
      category: 'students',
      description: 'Proud graduates from Japanese universities'
    }
  ];

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'students', label: 'Students' },
    { key: 'classes', label: 'Classes' },
    { key: 'events', label: 'Events' },
    { key: 'arrivals', label: 'Japan Arrivals' },
    { key: 'office', label: 'Office' }
  ];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const handleImageClick = (item) => {
    setSelectedImage(item);
    setShowModal(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-surface-alt">
        <Container>
          <Row className={`text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <Col>
              <h1 className="fw-bold mb-4">Gallery</h1>
              <p className="lead text-muted">
                Moments from our journey - students, classes, and success stories
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        {/* Filter Buttons */}
        <Row className={`mb-4 ${isVisible ? 'animate-fade-up animate-delay-1' : 'opacity-0'}`}>
          <Col className="text-center">
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.key}
                  pill
                  className="px-3 py-2 cursor-pointer hover-lift"
                  style={{ 
                    cursor: 'pointer',
                    backgroundColor: filter === category.key 
                      ? 'var(--brand-accent-red)' 
                      : 'var(--brand-surface-alt)',
                    color: filter === category.key 
                      ? 'white' 
                      : 'var(--brand-primary-dark)'
                  }}
                  onClick={() => setFilter(category.key)}
                >
                  {category.label}
                </Badge>
              ))}
            </div>
          </Col>
        </Row>

        {/* Gallery Grid */}
        <Row>
          {filteredItems.map((item, index) => (
            <Col lg={4} md={6} className={`mb-4 ${isVisible ? `animate-fade-up animate-delay-${(index % 3) + 2}` : 'opacity-0'}`} key={item.id}>
              <Card 
                className="border-0 shadow-sm hover-lift cursor-pointer"
                onClick={() => handleImageClick(item)}
                style={{ cursor: 'pointer' }}
              >
                <div className="position-relative">
                  <Card.Img 
                    variant="top" 
                    src={item.src} 
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  {item.type === 'video' && (
                    <div 
                      className="position-absolute top-50 start-50 translate-middle"
                      style={{
                        backgroundColor: 'rgba(229, 62, 62, 0.9)',
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Play size={24} color="white" />
                    </div>
                  )}
                  <div className="position-absolute top-0 end-0 m-2">
                    <Badge 
                      style={{ 
                        backgroundColor: 'var(--brand-accent-pink)',
                        color: 'var(--brand-primary-dark)'
                      }}
                    >
                      {categories.find(cat => cat.key === item.category)?.label}
                    </Badge>
                  </div>
                </div>
                <Card.Body>
                  <Card.Title className="h6">{item.title}</Card.Title>
                  <Card.Text className="text-muted small">
                    {item.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Lightbox Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          <Modal.Header className="border-0">
            <Modal.Title>{selectedImage?.title}</Modal.Title>
            <Button 
              variant="outline-secondary" 
              onClick={() => setShowModal(false)}
              className="btn-close"
            >
              <X size={20} />
            </Button>
          </Modal.Header>
          <Modal.Body className="p-0">
            {selectedImage && (
              <div>
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title}
                  className="w-100"
                  style={{ maxHeight: '70vh', objectFit: 'contain' }}
                />
                <div className="p-3">
                  <p className="text-muted mb-0">{selectedImage.description}</p>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default Gallery;