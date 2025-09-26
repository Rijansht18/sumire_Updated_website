import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="h-100 border-0 shadow-sm card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transition: 'all 0.2s ease-in-out' }}
    >
      <Card.Body className="p-4 text-center">
        <div className="d-flex align-items-center justify-content-center mb-3">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ 
              width: '80px', 
              height: '80px', 
              backgroundColor: 'var(--brand-accent-pink)',
              color: 'var(--brand-primary-dark)'
            }}
          >
            <Icon size={32} />
          </div>
        </div>
        
        <Card.Title className="h4 mb-3">{title}</Card.Title>
        <Card.Text className="text-muted mb-4">{description}</Card.Text>
        
        <Button 
          variant="link" 
          className="p-0 text-decoration-none fw-semibold d-flex align-items-center justify-content-center"
          style={{ color: 'var(--brand-primary-dark)' }}
        >
          Learn more <ArrowRight size={16} className="ms-2" />
        </Button>
        
        {isHovered && (
          <div className="position-absolute" style={{ top: '20px', right: '20px' }}>
            <span className="sakura-petal" style={{ fontSize: '20px' }}>🌸</span>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;