import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { Users, MessageSquare, BookOpen, TrendingUp, GraduationCap, Award, Image, Calendar, FileText, Globe } from 'lucide-react';
import { adminAPI, contactAPI } from '../../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalClasses: 0,
    totalStudents: 0,
    monthlyInquiries: 0,
    totalUniversities: 0,
    totalScholarships: 0,
    totalEnrollments: 0,
    totalPages: 0,
    totalBlogPosts: 0,
    totalEvents: 0
  });
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch contacts
      const contactsResponse = await contactAPI.getAll();
      const contacts = contactsResponse.data.data;
      
      // Fetch other data
      const [universitiesRes, scholarshipsRes, enrollmentsRes] = await Promise.all([
        fetch('/api/universities').then(r => r.json()).catch(() => []),
        fetch('/api/scholarships').then(r => r.json()).catch(() => []),
        fetch('/api/enrollments').then(r => r.json()).catch(() => [])
      ]);
      
      setStats({
        totalContacts: contacts.length,
        totalClasses: 6,
        totalStudents: 150,
        monthlyInquiries: contacts.filter(c => 
          new Date(c.createdAt).getMonth() === new Date().getMonth()
        ).length,
        totalUniversities: Array.isArray(universitiesRes) ? universitiesRes.length : 0,
        totalScholarships: Array.isArray(scholarshipsRes) ? scholarshipsRes.length : 0,
        totalEnrollments: Array.isArray(enrollmentsRes) ? enrollmentsRes.length : 0,
        totalPages: 12,
        totalBlogPosts: 8,
        totalEvents: 5
      });
      
      setRecentContacts(contacts.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <Card className="border-0 shadow-sm h-100 hover-lift">
      <Card.Body className="p-4">
        <div className="d-flex align-items-center">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{ width: '50px', height: '50px', backgroundColor: color, color: 'white' }}
          >
            <Icon size={24} />
          </div>
          <div>
            <h3 className="mb-0 fw-bold">{value}</h3>
            <p className="text-muted mb-0">{title}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">Dashboard</h2>
          <p className="text-muted">Welcome back to Sakura Japan Admin Panel</p>
        </Col>
      </Row>

      {/* Main Stats */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <StatCard 
            icon={MessageSquare} 
            title="Total Inquiries" 
            value={stats.totalContacts}
            color="var(--brand-accent-red)"
          />
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <StatCard 
            icon={BookOpen} 
            title="Active Classes" 
            value={stats.totalClasses}
            color="var(--brand-accent-pink)"
          />
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <StatCard 
            icon={Users} 
            title="Total Students" 
            value={stats.totalStudents}
            color="var(--brand-primary-dark)"
          />
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <StatCard 
            icon={TrendingUp} 
            title="This Month" 
            value={stats.monthlyInquiries}
            color="#28a745"
          />
        </Col>
      </Row>

      {/* Content Stats */}
      <Row className="mb-4">
        <Col lg={2} md={4} className="mb-3">
          <StatCard 
            icon={GraduationCap} 
            title="Universities" 
            value={stats.totalUniversities}
            color="#6f42c1"
          />
        </Col>
        <Col lg={2} md={4} className="mb-3">
          <StatCard 
            icon={Award} 
            title="Scholarships" 
            value={stats.totalScholarships}
            color="#fd7e14"
          />
        </Col>
        <Col lg={2} md={4} className="mb-3">
          <StatCard 
            icon={Users} 
            title="Enrollments" 
            value={stats.totalEnrollments}
            color="#20c997"
          />
        </Col>
        <Col lg={2} md={4} className="mb-3">
          <StatCard 
            icon={Globe} 
            title="Pages" 
            value={stats.totalPages}
            color="#6c757d"
          />
        </Col>
        <Col lg={2} md={4} className="mb-3">
          <StatCard 
            icon={FileText} 
            title="Blog Posts" 
            value={stats.totalBlogPosts}
            color="#17a2b8"
          />
        </Col>
        <Col lg={2} md={4} className="mb-3">
          <StatCard 
            icon={Calendar} 
            title="Events" 
            value={stats.totalEvents}
            color="#e83e8c"
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0">Recent Inquiries</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Purpose</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentContacts.map((contact, index) => (
                    <tr key={index}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>
                        <Badge bg="light" text="dark">
                          {contact.purpose?.replace('-', ' ') || 'General'}
                        </Badge>
                      </td>
                      <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Badge bg="warning">
                          Pending
                        </Badge>
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

export default AdminDashboard;