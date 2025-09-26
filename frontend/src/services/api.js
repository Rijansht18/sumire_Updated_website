import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
};

// Classes API
export const classAPI = {
  getAll: (params) => api.get('/classes', { params }),
  create: (data) => api.post('/classes', data),
};

// Services API
export const serviceAPI = {
  getAll: () => api.get('/services'),
};

// Admin API
export const adminAPI = {
  login: (credentials) => api.post('/admin/login', credentials),
  getStats: () => api.get('/admin/stats'),
  getContent: (type) => api.get(`/admin/content/${type}`),
  updateContent: (type, data) => api.put(`/admin/content/${type}`, data),
  getAllPages: () => api.get('/pages/admin/all'),
  updatePageVisibility: (id, data) => api.put(`/pages/admin/${id}/visibility`, data),
  updatePageContent: (id, data) => api.put(`/pages/admin/${id}/content`, data),
};

// Pages API
export const pageAPI = {
  getVisiblePages: () => api.get('/pages'),
};

// University API
export const universityAPI = {
  getAll: () => api.get('/universities'),
  create: (data) => api.post('/universities', data),
  update: (id, data) => api.put(`/universities/${id}`, data),
  delete: (id) => api.delete(`/universities/${id}`),
};

// Scholarship API
export const scholarshipAPI = {
  getAll: () => api.get('/scholarships'),
  create: (data) => api.post('/scholarships', data),
  update: (id, data) => api.put(`/scholarships/${id}`, data),
};

// Enrollment API
export const enrollmentAPI = {
  submit: (data) => api.post('/enrollments', data),
  getAll: () => api.get('/enrollments'),
  updateStatus: (id, status) => api.put(`/enrollments/${id}/status`, { status }),
};

export default api;