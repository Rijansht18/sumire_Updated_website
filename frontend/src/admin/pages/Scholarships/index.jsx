import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { scholarshipAPI } from '../../../services/api';

const AdminScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    provider: '',
    amount: '',
    deadline: '',
    description: '',
    eligibility: '',
    requirements: ''
  });
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const response = await scholarshipAPI.getAll();
      setScholarships(response.data.data);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        eligibility: formData.eligibility.split(',').map(e => e.trim()),
        requirements: formData.requirements.split(',').map(r => r.trim())
      };
      
      if (editingScholarship) {
        await scholarshipAPI.update(editingScholarship._id, submitData);
        setAlert({ show: true, message: 'Scholarship updated successfully!', variant: 'success' });
      } else {
        await scholarshipAPI.create(submitData);
        setAlert({ show: true, message: 'Scholarship created successfully!', variant: 'success' });
      }
      
      fetchScholarships();
      handleCloseModal();
    } catch (error) {
      setAlert({ show: true, message: 'Error saving scholarship', variant: 'danger' });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingScholarship(null);
    setFormData({
      name: '',
      provider: '',
      amount: '',
      deadline: '',
      description: '',
      eligibility: '',
      requirements: ''
    });
  };

  const handleEdit = (scholarship) => {
    setEditingScholarship(scholarship);
    setFormData({
      ...scholarship,
      deadline: scholarship.deadline ? new Date(scholarship.deadline).toISOString().split('T')[0] : '',
      eligibility: scholarship.eligibility?.join(', ') || '',
      requirements: scholarship.requirements?.join(', ') || ''
    });
    setShowModal(true);
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold">Scholarships Management</h2>
              <p className="text-muted">Manage scholarship listings</p>
            </div>
            <Button className="btn-accent-red" onClick={() => setShowModal(true)}>
              <Plus size={18} className="me-2" />
              Add Scholarship
            </Button>
          </div>
        </Col>
      </Row>

      {alert.show && (
        <Row className="mb-3">
          <Col>
            <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
              {alert.message}
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Scholarship Name</th>
                    <th>Provider</th>
                    <th>Amount</th>
                    <th>Deadline</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scholarships.map((scholarship) => (
                    <tr key={scholarship._id}>
                      <td className="fw-semibold">{scholarship.name}</td>
                      <td>{scholarship.provider}</td>
                      <td>{scholarship.amount}</td>
                      <td>{scholarship.deadline ? new Date(scholarship.deadline).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(scholarship)}
                          className="me-2"
                        >
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

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingScholarship ? 'Edit Scholarship' : 'Add Scholarship'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Scholarship Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Provider</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.provider}
                    onChange={(e) => setFormData({...formData, provider: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Deadline</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Eligibility (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={formData.eligibility}
                onChange={(e) => setFormData({...formData, eligibility: e.target.value})}
                placeholder="Bachelor's degree, Under 35 years, Strong academic record"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" className="btn-accent-red">
              {editingScholarship ? 'Update Scholarship' : 'Create Scholarship'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminScholarships;