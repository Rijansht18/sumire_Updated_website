import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminGallery = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      title: "Students at Tokyo University",
      category: "students",
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Japanese Language Class",
      category: "classes",
      src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop"
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    src: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setImages([...images, {
      ...formData,
      id: Date.now()
    }]);
    setShowModal(false);
    setFormData({ title: '', category: '', src: '', description: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setImages(images.filter(img => img.id !== id));
    }
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold">Gallery Management</h2>
              <p className="text-muted">Manage gallery images and media</p>
            </div>
            <Button className="btn-accent-red" onClick={() => setShowModal(true)}>
              <Plus size={18} className="me-2" />
              Add Image
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        {images.map((image) => (
          <Col lg={3} md={4} sm={6} className="mb-4" key={image.id}>
            <Card className="border-0 shadow-sm">
              <Card.Img variant="top" src={image.src} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body className="p-3">
                <Card.Title className="h6">{image.title}</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-light text-dark">{image.category}</span>
                  <div>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      <Edit size={14} />
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Image</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
              >
                <option value="">Select Category</option>
                <option value="students">Students</option>
                <option value="classes">Classes</option>
                <option value="events">Events</option>
                <option value="office">Office</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                value={formData.src}
                onChange={(e) => setFormData({...formData, src: e.target.value})}
                required
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
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" className="btn-accent-red">
              Add Image
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminGallery;