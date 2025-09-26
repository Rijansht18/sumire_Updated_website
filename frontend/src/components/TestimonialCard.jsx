import React from 'react';
import { Card } from 'react-bootstrap';
import { Star } from 'lucide-react';

const TestimonialCard = ({ 
  name, 
  image, 
  quote, 
  rating, 
  destination,
  program 
}) => {
  return (
    <Card className="border-0 bg-surface-alt h-100">
      <Card.Body className="p-4">
        <div className="d-flex align-items-center mb-3">
          <div 
            className="rounded-circle me-3"
            style={{ 
              width: '60px', 
              height: '60px', 
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div>
            <h6 className="mb-1 fw-semibold">{name}</h6>
            <small className="text-muted">{program} • {destination}</small>
          </div>
        </div>
        
        <div className="mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              fill={i < rating ? 'var(--brand-accent-red)' : 'none'}
              color={i < rating ? 'var(--brand-accent-red)' : 'var(--brand-ink-muted)'}
            />
          ))}
        </div>
        
        <blockquote className="mb-0">
          <p className="mb-0 fst-italic">"{quote}"</p>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default TestimonialCard;