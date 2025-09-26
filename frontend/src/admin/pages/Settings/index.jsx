import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Form, Button, Alert } from 'react-bootstrap';
import { Eye, EyeOff, Edit } from 'lucide-react';
import { adminAPI } from '../../../services/api';

const AdminSettings = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await adminAPI.getAllPages();
      setPages(response.data.data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePageVisibility = async (pageId, currentVisibility) => {
    try {
      await adminAPI.updatePageVisibility(pageId, { isVisible: !currentVisibility });
      setPages(pages.map(page => 
        page._id === pageId 
          ? { ...page, isVisible: !currentVisibility }
          : page
      ));
      setAlert({
        show: true,
        message: 'Page visibility updated successfully',
        variant: 'success'
      });
      setTimeout(() => setAlert({ show: false }), 3000);
    } catch (error) {
      setAlert({
        show: true,
        message: 'Error updating page visibility',
        variant: 'danger'
      });
    }
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">Settings</h2>
          <p className="text-muted">Manage website settings and page visibility</p>
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
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0">Page Visibility Control</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Page Name</th>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Visibility</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((page) => (
                    <tr key={page._id}>
                      <td className="fw-semibold">{page.name}</td>
                      <td>{page.title}</td>
                      <td>
                        <code>/{page.slug}</code>
                      </td>
                      <td>
                        <Form.Check
                          type="switch"
                          checked={page.isVisible}
                          onChange={() => togglePageVisibility(page._id, page.isVisible)}
                          label={page.isVisible ? 'Visible' : 'Hidden'}
                        />
                      </td>
                      <td>{new Date(page.updatedAt).toLocaleDateString()}</td>
                      <td>
                        <Button
                          variant={page.isVisible ? "outline-success" : "outline-secondary"}
                          size="sm"
                          className="me-2"
                          onClick={() => togglePageVisibility(page._id, page.isVisible)}
                        >
                          {page.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                        </Button>
                        <Button variant="outline-primary" size="sm">
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
    </Container>
  );
};

export default AdminSettings;