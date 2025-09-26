import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Tabs } from 'react-bootstrap';
import { Save, Globe, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const SiteSettings = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'Sakura Japan Consultancy',
    siteDescription: 'Your trusted partner for studying, working, and living in Japan',
    siteKeywords: 'Japan, study abroad, work visa, language classes, consultancy',
    
    // Contact Information
    email: 'info@sakurajapan.com',
    phone: '+81-3-XXXX-XXXX',
    address: 'Tokyo, Japan & International Offices',
    businessHours: 'Mon-Fri: 9:00 AM - 6:00 PM JST',
    
    // Social Media
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    
    // SEO Settings
    metaTitle: 'Sakura Japan Consultancy - Study & Work in Japan',
    metaDescription: 'Expert guidance for studying, working, and living in Japan. Visa assistance, language classes, and comprehensive support services.',
    
    // Email Settings
    emailHost: 'smtp.gmail.com',
    emailPort: '587',
    emailUser: '',
    emailPassword: '',
    
    // Analytics
    googleAnalyticsId: '',
    facebookPixelId: '',
    
    // Maintenance
    maintenanceMode: false,
    maintenanceMessage: 'We are currently performing scheduled maintenance. Please check back soon.'
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      showAlert('Error fetching settings', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        showAlert('Settings updated successfully', 'success');
      }
    } catch (error) {
      showAlert('Error updating settings', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Container fluid className="p-4">
      {alert.show && (
        <Alert variant={alert.type} className="mb-4">
          {alert.message}
        </Alert>
      )}

      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">Site Settings</h2>
          <p className="text-muted">Manage your website configuration and settings</p>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        <Tabs defaultActiveKey="general" className="mb-4">
          {/* General Settings */}
          <Tab eventKey="general" title="General">
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">
                  <Globe size={20} className="me-2" />
                  General Information
                </h5>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Site Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={settings.siteName}
                        onChange={(e) => handleInputChange('siteName', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Meta Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={settings.metaTitle}
                        onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Site Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={settings.siteDescription}
                    onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Meta Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={settings.metaDescription}
                    onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Keywords (comma separated)</Form.Label>
                  <Form.Control
                    type="text"
                    value={settings.siteKeywords}
                    onChange={(e) => handleInputChange('siteKeywords', e.target.value)}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Tab>

          {/* Contact Settings */}
          <Tab eventKey="contact" title="Contact">
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">
                  <Phone size={20} className="me-2" />
                  Contact Information
                </h5>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <Mail size={16} className="me-2" />
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <Phone size={16} className="me-2" />
                        Phone Number
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={settings.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <MapPin size={16} className="me-2" />
                    Address
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={settings.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Business Hours</Form.Label>
                  <Form.Control
                    type="text"
                    value={settings.businessHours}
                    onChange={(e) => handleInputChange('businessHours', e.target.value)}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Tab>

          {/* Social Media */}
          <Tab eventKey="social" title="Social Media">
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">Social Media Links</h5>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <Facebook size={16} className="me-2" />
                        Facebook URL
                      </Form.Label>
                      <Form.Control
                        type="url"
                        value={settings.facebook}
                        onChange={(e) => handleInputChange('facebook', e.target.value)}
                        placeholder="https://facebook.com/yourpage"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <Twitter size={16} className="me-2" />
                        Twitter URL
                      </Form.Label>
                      <Form.Control
                        type="url"
                        value={settings.twitter}
                        onChange={(e) => handleInputChange('twitter', e.target.value)}
                        placeholder="https://twitter.com/yourhandle"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <Instagram size={16} className="me-2" />
                        Instagram URL
                      </Form.Label>
                      <Form.Control
                        type="url"
                        value={settings.instagram}
                        onChange={(e) => handleInputChange('instagram', e.target.value)}
                        placeholder="https://instagram.com/yourhandle"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <Linkedin size={16} className="me-2" />
                        LinkedIn URL
                      </Form.Label>
                      <Form.Control
                        type="url"
                        value={settings.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/company/yourcompany"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Tab>

          {/* Analytics */}
          <Tab eventKey="analytics" title="Analytics">
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">Analytics & Tracking</h5>
                
                <Form.Group className="mb-3">
                  <Form.Label>Google Analytics ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={settings.googleAnalyticsId}
                    onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                    placeholder="GA-XXXXXXXXX-X"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Facebook Pixel ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={settings.facebookPixelId}
                    onChange={(e) => handleInputChange('facebookPixelId', e.target.value)}
                    placeholder="XXXXXXXXXXXXXXX"
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Tab>

          {/* Maintenance */}
          <Tab eventKey="maintenance" title="Maintenance">
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">Maintenance Mode</h5>
                
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="maintenance-switch"
                    label="Enable Maintenance Mode"
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                  />
                  <Form.Text className="text-muted">
                    When enabled, visitors will see a maintenance message instead of the website
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Maintenance Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={settings.maintenanceMessage}
                    onChange={(e) => handleInputChange('maintenanceMessage', e.target.value)}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>

        <div className="text-end">
          <Button type="submit" className="btn-accent-red btn-lg" disabled={loading}>
            <Save size={16} className="me-2" />
            {loading ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default SiteSettings;