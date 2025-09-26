const Scholarship = require('../models/Scholarship');

const getScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find({ isActive: true }).sort({ deadline: 1 });
    res.json({
      success: true,
      data: scholarships
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching scholarships',
      error: error.message
    });
  }
};

const createScholarship = async (req, res) => {
  try {
    const scholarship = new Scholarship(req.body);
    await scholarship.save();
    res.status(201).json({
      success: true,
      message: 'Scholarship created successfully',
      data: scholarship
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating scholarship',
      error: error.message
    });
  }
};

const updateScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!scholarship) {
      return res.status(404).json({
        success: false,
        message: 'Scholarship not found'
      });
    }
    res.json({
      success: true,
      message: 'Scholarship updated successfully',
      data: scholarship
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating scholarship',
      error: error.message
    });
  }
};

module.exports = {
  getScholarships,
  createScholarship,
  updateScholarship
};