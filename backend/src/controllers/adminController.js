const Admin = require('../models/Admin');
const Contact = require('../models/Contact');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(admin._id);

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

const getStats = async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const pendingContacts = await Contact.countDocuments({ status: 'pending' });
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const monthlyContacts = await Contact.countDocuments({
      createdAt: { $gte: thisMonth }
    });

    res.json({
      success: true,
      data: {
        totalContacts,
        pendingContacts,
        monthlyContacts,
        totalClasses: 6 // Static for now
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stats',
      error: error.message
    });
  }
};

const createDefaultAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      await Admin.create({
        username: 'admin',
        password: 'admin123',
        role: 'super_admin'
      });
      console.log('Default admin created: admin/admin123');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};

module.exports = {
  login,
  getStats,
  createDefaultAdmin
};