const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/configs/database');
const { createDefaultAdmin } = require('./src/controllers/adminController');

// Import routes
const contactRoutes = require('./src/routes/contactRoutes');
const classRoutes = require('./src/routes/classRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const pageRoutes = require('./src/routes/pageRoutes');
const universityRoutes = require('./src/routes/universityRoutes');
const scholarshipRoutes = require('./src/routes/scholarshipRoutes');
const enrollmentRoutes = require('./src/routes/enrollmentRoutes');
const settingRoutes = require('./src/routes/settingRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Create default admin
createDefaultAdmin();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/settings', settingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Sakura Japan API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Admin login: http://localhost:${PORT}/admin/login`);
});