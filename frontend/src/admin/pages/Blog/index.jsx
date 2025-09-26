import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import { Plus, Edit, Eye } from 'lucide-react';

const AdminBlog = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Complete Guide to JLPT N5 Preparation",
      category: "Language Learning",
      author: "Sakura Team",
      date: "2024-01-15",
      status: "published"
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    status: 'draft'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosts([...posts, {
      ...formData,
      id: Date.now(),
      author: 'Admin',
      date: new Date().toISOString().split('T')[0]
    }]);
    setShowModal(false);
    setFormData({ title: '', category: '', content: '', status: 'draft' });
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold">Blog Management</h2>
              <p className="text-muted">Manage blog posts and articles</p>
            </div>
            <Button className="btn-accent-red" onClick={() => setShowModal(true)}>
              <Plus size={18} className="me-2" />
              New Post
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td className="fw-semibold">{post.title}</td>
                      <td>{post.category}</td>
                      <td>{post.date}</td>
                      <td>
                        <span className={`badge ${post.status === 'published' ? 'bg-success' : 'bg-warning'}`}>
                          {post.status}
                        </span>
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-2">
                          <Edit size={14} />
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          <Eye size={14} />
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
          <Modal.Title>New Post</Modal.Title>
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
              >
                <option value="">Select Category</option>
                <option value="Language Learning">Language Learning</option>
                <option value="Study Abroad">Study Abroad</option>
                <option value="Culture">Culture</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" className="btn-accent-red">
              Create Post
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminBlog;