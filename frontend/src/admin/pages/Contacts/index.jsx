import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import { Eye, Edit } from 'lucide-react';
import { contactAPI } from '../../../services/api';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await contactAPI.getAll();
      setContacts(response.data.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      contacted: 'info',
      resolved: 'success'
    };
    return <Badge bg={variants[status] || 'warning'}>{status || 'pending'}</Badge>;
  };

  const getPurposeLabel = (purpose) => {
    const labels = {
      'study-abroad': 'Study Abroad',
      'language-classes': 'Language Classes',
      'work-visa': 'Work Visa',
      'general': 'General Inquiry'
    };
    return labels[purpose] || purpose || 'General';
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">Contact Inquiries</h2>
          <p className="text-muted">Manage customer inquiries and communications</p>
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
                    <th>Phone</th>
                    <th>Purpose</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id}>
                      <td className="fw-semibold">{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone || 'N/A'}</td>
                      <td>
                        <Badge bg="light" text="dark">
                          {getPurposeLabel(contact.purpose)}
                        </Badge>
                      </td>
                      <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                      <td>{getStatusBadge(contact.status)}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleViewContact(contact)}
                          className="me-2"
                        >
                          <Eye size={14} />
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          <Edit size={14} />
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

      {/* Contact Detail Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContact && (
            <Row>
              <Col md={6}>
                <h6>Personal Information</h6>
                <p><strong>Name:</strong> {selectedContact.name}</p>
                <p><strong>Email:</strong> {selectedContact.email}</p>
                <p><strong>Phone:</strong> {selectedContact.phone || 'Not provided'}</p>
                <p><strong>Purpose:</strong> {getPurposeLabel(selectedContact.purpose)}</p>
              </Col>
              <Col md={6}>
                <h6>Inquiry Details</h6>
                <p><strong>Date:</strong> {new Date(selectedContact.createdAt).toLocaleString()}</p>
                <p><strong>Status:</strong> {getStatusBadge(selectedContact.status)}</p>
              </Col>
              <Col xs={12}>
                <h6>Message</h6>
                <div className="bg-light p-3 rounded">
                  {selectedContact.message}
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button className="btn-accent-red">
            Mark as Contacted
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminContacts;