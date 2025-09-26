import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Badge, Spinner } from 'react-bootstrap';
import ClassCard from '../../components/ClassCard';
import { Filter } from 'lucide-react';
import { classAPI } from '../../services/api';

const Classes = () => {
  const [filters, setFilters] = useState({
    level: 'all',
    schedule: 'all',
    fee: 'all'
  });
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await classAPI.getAll(filters);
      setClasses(response.data.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = (classTitle) => {
    alert(`Enrolling in ${classTitle}`);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-surface-alt">
        <Container>
          <Row className={`text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <Col>
              <h1 className="fw-bold mb-3">Japanese Language Classes</h1>
              <p className="lead text-muted">
                Master Japanese with our expert instructors and structured curriculum
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        {/* Filters */}
        <Row className={`mb-4 ${isVisible ? 'animate-fade-up animate-delay-1' : 'opacity-0'}`}>
          <Col>
            <div className="bg-surface-alt p-4 rounded-xl">
              <div className="d-flex align-items-center mb-3">
                <Filter size={20} className="me-2" />
                <h5 className="mb-0">Filter Classes</h5>
              </div>
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Level</Form.Label>
                    <Form.Select 
                      value={filters.level}
                      onChange={(e) => setFilters({...filters, level: e.target.value})}
                    >
                      <option value="all">All Levels</option>
                      <option value="N5">N5 Beginner</option>
                      <option value="N4">N4 Elementary</option>
                      <option value="N3">N3 Intermediate</option>
                      <option value="N2">N2 Upper-Intermediate</option>
                      <option value="N1">N1 Advanced</option>
                      <option value="Business">Business Japanese</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Schedule</Form.Label>
                    <Form.Select 
                      value={filters.schedule}
                      onChange={(e) => setFilters({...filters, schedule: e.target.value})}
                    >
                      <option value="all">All Schedules</option>
                      <option value="weekday">Weekday Evening</option>
                      <option value="weekend">Weekend</option>
                      <option value="online">Online</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                  <Button variant="outline-dark" className="w-100" onClick={fetchClasses}>
                    Apply Filters
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* Class Cards */}
        <Row>
          {loading ? (
            <Col className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading classes...</p>
            </Col>
          ) : classes.length > 0 ? (
            classes.map((classItem, index) => (
              <Col lg={4} md={6} className={`mb-4 ${isVisible ? `animate-fade-up animate-delay-${(index % 3) + 2}` : 'opacity-0'}`} key={index}>
                <ClassCard 
                  {...classItem} 
                  onEnroll={() => handleEnroll(classItem.title)}
                />
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <p className="text-muted">No classes found matching your criteria.</p>
            </Col>
          )}
        </Row>

        {/* Info Section */}
        <Row className={`mt-5 pt-5 ${isVisible ? 'animate-fade-up animate-delay-5' : 'opacity-0'}`}>
          <Col lg={8} className="mx-auto text-center">
            <h3 className="fw-bold mb-3">Why Choose Our Classes?</h3>
            <Row>
              <Col md={4} className="mb-3">
                <Badge 
                  className="mb-2 px-3 py-2"
                  style={{ 
                    backgroundColor: 'var(--brand-accent-pink)', 
                    color: 'var(--brand-primary-dark)' 
                  }}
                >
                  Native Instructors
                </Badge>
                <p className="small text-muted">Learn from qualified Japanese teachers</p>
              </Col>
              <Col md={4} className="mb-3">
                <Badge 
                  className="mb-2 px-3 py-2"
                  style={{ 
                    backgroundColor: 'var(--brand-accent-pink)', 
                    color: 'var(--brand-primary-dark)' 
                  }}
                >
                  Small Batches
                </Badge>
                <p className="small text-muted">Maximum 10 students per class</p>
              </Col>
              <Col md={4} className="mb-3">
                <Badge 
                  className="mb-2 px-3 py-2"
                  style={{ 
                    backgroundColor: 'var(--brand-accent-pink)', 
                    color: 'var(--brand-primary-dark)' 
                  }}
                >
                  JLPT Focused
                </Badge>
                <p className="small text-muted">Structured curriculum for exam success</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Classes;