import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AdminSidebar from './components/AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;