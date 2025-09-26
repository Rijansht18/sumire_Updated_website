import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  MessageSquare, 
  Settings,
  FileText,
  Image,
  Calendar,
  GraduationCap,
  Award,
  UserPlus,
  Eye,
  LogOut,
  Globe,
  Layout
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: BarChart3, label: 'Dashboard' },
    { path: '/admin/contacts', icon: MessageSquare, label: 'Contacts' },
    { path: '/admin/enrollments', icon: UserPlus, label: 'Enrollments' },
    { path: '/admin/classes', icon: BookOpen, label: 'Classes' },
    { path: '/admin/universities', icon: GraduationCap, label: 'Universities' },
    { path: '/admin/scholarships', icon: Award, label: 'Scholarships' },
    { path: '/admin/gallery', icon: Image, label: 'Gallery' },
    { path: '/admin/blog', icon: FileText, label: 'Blog' },
    { path: '/admin/events', icon: Calendar, label: 'Events' },
    { path: '/admin/pages', icon: Layout, label: 'Pages' },
    { path: '/admin/site-settings', icon: Globe, label: 'Site Settings' },
    { path: '/admin/settings', icon: Settings, label: 'System' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <div className="bg-white border-end" style={{ width: '280px', minHeight: '100vh', boxShadow: '2px 0 10px rgba(0,0,0,0.1)' }}>
      <div className="p-4 border-bottom">
        <div className="text-center">
          <h4 className="fw-bold mb-1" style={{ color: 'var(--brand-accent-red)' }}>🌸 Sakura Admin</h4>
          <small className="text-muted">Content Management</small>
        </div>
      </div>
      <Nav className="flex-column p-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Nav.Link
              key={item.path}
              as={Link}
              to={item.path}
              className={`d-flex align-items-center py-2 px-3 rounded mb-1 text-decoration-none ${
                isActive ? 'text-white' : 'text-dark'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--brand-accent-red)' : 'transparent',
                transition: 'all 0.2s ease'
              }}
            >
              <item.icon size={18} className="me-3" />
              <span className="fw-medium">{item.label}</span>
            </Nav.Link>
          );
        })}
        
        <hr className="my-3" />
        
        <Nav.Link
          className="d-flex align-items-center py-2 px-3 rounded text-danger text-decoration-none"
          onClick={handleLogout}
          style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
        >
          <LogOut size={18} className="me-3" />
          <span className="fw-medium">Logout</span>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default AdminSidebar;