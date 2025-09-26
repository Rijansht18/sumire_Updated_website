import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Modal } from 'react-bootstrap';
import { Eye, Edit } from 'lucide-react';
import { enrollmentAPI } from '../../../services/api';

const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await enrollmentAPI.getAll();
      setEnrollments(response.data.data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  const handleViewEnrollment = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setShowModal(true);
  };

  const updateStatus = async (id, status) => {
    try {
      await enrollmentAPI.updateStatus(id, status);
      fetchEnrollments();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      contacted: 'info',
      enrolled: 'success',
      rejected: 'danger'
    };
    return <Badge bg={variants[status] || 'warning'}>{status}</Badge>;
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">Enrollment Management</h2>
          <p className="text-muted">Manage class enrollment requests</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Level</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment._id}>
                      <td className="fw-semibold">{enrollment.name}</td>
                      <td>{enrollment.email}</td>
                      <td>{enrollment.course}</td>
                      <td>{enrollment.level}</td>
                      <td>{new Date(enrollment.createdAt).toLocaleDateString()}</td>
                      <td>{getStatusBadge(enrollment.status)}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleViewEnrollment(enrollment)}
                          className="me-2"
                        >
                          <Eye size={14} />
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => updateStatus(enrollment._id, 'contacted')}
                        >
                          Mark Contacted
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Enrollment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEnrollment && (
            <Row>
              <Col md={6}>
                <h6>Personal Information</h6>
                <p><strong>Name:</strong> {selectedEnrollment.name}</p>
                <p><strong>Email:</strong> {selectedEnrollment.email}</p>
                <p><strong>Phone:</strong> {selectedEnrollment.phone}</p>
              </Col>
              <Col md={6}>
                <h6>Course Details</h6>
                <p><strong>Course:</strong> {selectedEnrollment.course}</p>
                <p><strong>Level:</strong> {selectedEnrollment.level}</p>
                <p><strong>Status:</strong> {getStatusBadge(selectedEnrollment.status)}</p>
              </Col>
              <Col xs={12}>
                <h6>Message</h6>
                <div className="bg-light p-3 rounded">
                  {selectedEnrollment.message || 'No message provided'}
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminEnrollments;