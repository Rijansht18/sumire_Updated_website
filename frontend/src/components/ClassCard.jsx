import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Clock, Users, User } from 'lucide-react';

const ClassCard = ({ 
  title, 
  schedule, 
  teacher, 
  batchSize, 
  fee, 
  level,
  onEnroll 
}) => {
  return (
    <Card className="h-100 border-0 shadow-sm card-hover">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Card.Title className="h5 mb-0">{title}</Card.Title>
          <Badge 
            pill 
            style={{ 
              backgroundColor: 'var(--brand-accent-pink)', 
              color: 'var(--brand-primary-dark)' 
            }}
          >
            {level}
          </Badge>
        </div>
        
        <div className="mb-3">
          <div className="d-flex align-items-center mb-2 text-muted">
            <Clock size={16} className="me-2" />
            <small>{schedule}</small>
          </div>
          <div className="d-flex align-items-center mb-2 text-muted">
            <User size={16} className="me-2" />
            <small>{teacher}</small>
          </div>
          <div className="d-flex align-items-center mb-2 text-muted">
            <Users size={16} className="me-2" />
            <small>{batchSize} students</small>
          </div>
        </div>
        
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="h5 fw-bold" style={{ color: 'var(--brand-accent-red)' }}>
              ¥{fee.toLocaleString()}
            </span>
            <small className="text-muted d-block">per month</small>
          </div>
          <Button className="btn-accent-red" href="/enroll">
            Enroll
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ClassCard;