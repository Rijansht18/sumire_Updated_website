const University = require('../models/University');

const getUniversities = async (req, res) => {
  try {
    const universities = await University.find({ isActive: true }).sort({ ranking: 1 });
    res.json({
      success: true,
      data: universities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching universities',
      error: error.message
    });
  }
};

const createUniversity = async (req, res) => {
  try {
    const university = new University(req.body);
    await university.save();
    res.status(201).json({
      success: true,
      message: 'University created successfully',
      data: university
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating university',
      error: error.message
    });
  }
};

const updateUniversity = async (req, res) => {
  try {
    const university = await University.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!university) {
      return res.status(404).json({
        success: false,
        message: 'University not found'
      });
    }
    res.json({
      success: true,
      message: 'University updated successfully',
      data: university
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating university',
      error: error.message
    });
  }
};

const deleteUniversity = async (req, res) => {
  try {
    await University.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({
      success: true,
      message: 'University deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting university',
      error: error.message
    });
  }
};

module.exports = {
  getUniversities,
  createUniversity,
  updateUniversity,
  deleteUniversity
};