import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { classAPI } from '../../../services/api';

const AdminClasses = () => {
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    level: 'N5',
    schedule: '',
    teacher: '',
    batchSize: '',
    fee: '',
    duration: '',
    description: ''
  });
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await classAPI.getAll();
      setClasses(response.data.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClass) {
        setAlert({ show: true, message: 'Class updated successfully!', variant: 'success' });
      } else {
        await classAPI.create(formData);
        setAlert({ show: true, message: 'Class created successfully!', variant: 'success' });
        fetchClasses();
      }
      handleCloseModal();
    } catch (error) {
      setAlert({ show: true, message: 'Error saving class', variant: 'danger' });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClass(null);
    setFormData({
      title: '',
      level: 'N5',
      schedule: '',
      teacher: '',
      batchSize: '',
      fee: '',
      duration: '',
      description: ''
    });
  };

  const handleEdit = (classItem) => {
    setEditingClass(classItem);
    setFormData(classItem);
    setShowModal(true);
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold">Classes Management</h2>
              <p className="text-muted">Manage Japanese language classes</p>
            </div>
            <Button className="btn-accent-red" onClick={() => setShowModal(true)}>
              <Plus size={18} className="me-2" />
              Add New Class
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
                    <th>Class Title</th>
                    <th>Level</th>
                    <th>Schedule</th>
                    <th>Teacher</th>
                    <th>Batch Size</th>
                    <th>Fee (¥)</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((classItem) => (
                    <tr key={classItem._id}>
                      <td className="fw-semibold">{classItem.title}</td>
                      <td>
                        <span className="badge bg-primary">{classItem.level}</span>
                      </td>
                      <td>{classItem.schedule}</td>
                      <td>{classItem.teacher}</td>
                      <td>{classItem.batchSize} students</td>
                      <td>¥{classItem.fee?.toLocaleString()}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(classItem)}
                          className="me-2"
                        >
                          <Edit size={14} />
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          <Trash2 size={14} />
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

      {/* Add/Edit Class Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingClass ? 'Edit Class' : 'Add New Class'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Class Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Level</Form.Label>
                  <Form.Select
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                  >
                    <option value="N5">N5 Beginner</option>
                    <option value="N4">N4 Elementary</option>
                    <option value="N3">N3 Intermediate</option>
                    <option value="N2">N2 Upper-Intermediate</option>
                    <option value="N1">N1 Advanced</option>
                    <option value="Business">Business Japanese</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Schedule</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.schedule}
                    onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                    placeholder="e.g., Mon, Wed, Fri - 6:00 PM"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teacher</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.teacher}
                    onChange={(e) => setFormData({...formData, teacher: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Batch Size</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.batchSize}
                    onChange={(e) => setFormData({...formData, batchSize: e.target.value})}
                    min="1"
                    max="15"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Fee (¥)</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.fee}
                    onChange={(e) => setFormData({...formData, fee: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="e.g., 3 months"
                    required
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" className="btn-accent-red">
              {editingClass ? 'Update Class' : 'Create Class'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminClasses;