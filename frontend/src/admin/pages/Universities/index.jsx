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
    tuitionFee: { min: '', max: '' },
    requirements: { gpa: '', jlptLevel: '', englishTest: '' },
    description: '',
    website: ''
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
        programs: formData.programs.split(',').map(p => p.trim()),
        tuitionFee: {
          min: parseInt(formData.tuitionFee.min) || 0,
          max: parseInt(formData.tuitionFee.max) || 0
        },
        requirements: {
          gpa: parseFloat(formData.requirements.gpa) || 0,
          jlptLevel: formData.requirements.jlptLevel,
          englishTest: formData.requirements.englishTest
        }
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

  const handleDelete = async (universityId) => {
    if (window.confirm('Are you sure you want to delete this university?')) {
      try {
        await universityAPI.delete(universityId);
        setAlert({ show: true, message: 'University deleted successfully!', variant: 'success' });
        fetchUniversities();
      } catch (error) {
        setAlert({ show: true, message: 'Error deleting university', variant: 'danger' });
      }
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
      tuitionFee: { min: '', max: '' },
      requirements: { gpa: '', jlptLevel: '', englishTest: '' },
      description: '',
      website: ''
    });
  };

  const handleEdit = (university) => {
    setEditingUniversity(university);
    setFormData({
      ...university,
      programs: university.programs?.join(', ') || '',
      tuitionFee: {
        min: university.tuitionFee?.min || '',
        max: university.tuitionFee?.max || ''
      },
      requirements: {
        gpa: university.requirements?.gpa || '',
        jlptLevel: university.requirements?.jlptLevel || '',
        englishTest: university.requirements?.englishTest || ''
      }
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
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(university._id)}
                        >
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

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingUniversity ? 'Edit University' : 'Add University'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>University Name</Form.Label>
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
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Ranking</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.ranking}
                    onChange={(e) => setFormData({...formData, ranking: e.target.value})}
                    placeholder="#1 in Japan"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Programs (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={formData.programs}
                onChange={(e) => setFormData({...formData, programs: e.target.value})}
                placeholder="Engineering, Medicine, Business"
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Min Tuition Fee (¥)</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.tuitionFee.min}
                    onChange={(e) => setFormData({...formData, tuitionFee: {...formData.tuitionFee, min: e.target.value}})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Max Tuition Fee (¥)</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.tuitionFee.max}
                    onChange={(e) => setFormData({...formData, tuitionFee: {...formData.tuitionFee, max: e.target.value}})}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Required GPA</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.1"
                    value={formData.requirements.gpa}
                    onChange={(e) => setFormData({...formData, requirements: {...formData.requirements, gpa: e.target.value}})}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>JLPT Level</Form.Label>
                  <Form.Select
                    value={formData.requirements.jlptLevel}
                    onChange={(e) => setFormData({...formData, requirements: {...formData.requirements, jlptLevel: e.target.value}})}
                  >
                    <option value="">Select Level</option>
                    <option value="N5">N5</option>
                    <option value="N4">N4</option>
                    <option value="N3">N3</option>
                    <option value="N2">N2</option>
                    <option value="N1">N1</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>English Test</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.requirements.englishTest}
                    onChange={(e) => setFormData({...formData, requirements: {...formData.requirements, englishTest: e.target.value}})}
                    placeholder="TOEFL 80+"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Website URL</Form.Label>
              <Form.Control
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
              />
            </Form.Group>
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
              {editingUniversity ? 'Update University' : 'Create University'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminUniversities;