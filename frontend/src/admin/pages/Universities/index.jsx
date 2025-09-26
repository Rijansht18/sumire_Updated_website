import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { universityAPI } from '../../../services/api';

const AdminUniversities = () => {
  const [universities, setUniversities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    ranking: '',
    image: '',
    programs: '',
    description: ''
  });
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const response = await universityAPI.getAll();
      setUniversities(response.data.data);
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        programs: formData.programs.split(',').map(p => p.trim())
      };
      
      if (editingUniversity) {
        await universityAPI.update(editingUniversity._id, submitData);
        setAlert({ show: true, message: 'University updated successfully!', variant: 'success' });
      } else {
        await universityAPI.create(submitData);
        setAlert({ show: true, message: 'University created successfully!', variant: 'success' });
      }
      
      fetchUniversities();
      handleCloseModal();
    } catch (error) {
      setAlert({ show: true, message: 'Error saving university', variant: 'danger' });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUniversity(null);
    setFormData({
      name: '',
      location: '',
      ranking: '',
      image: '',
      programs: '',
      description: ''
    });
  };

  const handleEdit = (university) => {
    setEditingUniversity(university);
    setFormData({
      ...university,
      programs: university.programs?.join(', ') || ''
    });
    setShowModal(true);
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold">Universities Management</h2>
              <p className="text-muted">Manage university listings</p>
            </div>
            <Button className="btn-accent-red" onClick={() => setShowModal(true)}>
              <Plus size={18} className="me-2" />
              Add University
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
                    <th>University Name</th>
                    <th>Location</th>
                    <th>Ranking</th>
                    <th>Programs</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {universities.map((university) => (
                    <tr key={university._id}>
                      <td className="fw-semibold">{university.name}</td>
                      <td>{university.location}</td>
                      <td>{university.ranking}</td>
                      <td>
                        {university.programs?.slice(0, 2).map((program, idx) => (
                          <span key={idx} className="badge bg-light text-dark me-1">
                            {program}
                          </span>
                        ))}
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(university)}
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
          <Modal.Title>{editingUniversity ? 'Edit University' : 'Add University'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>University Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Programs (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={formData.programs}
                onChange={(e) => setFormData({...formData, programs: e.target.value})}
                placeholder="Engineering, Medicine, Business"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" className="btn-accent-red">
              {editingUniversity ? 'Update University' : 'Create University'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminUniversities;