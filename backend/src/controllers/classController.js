const Class = require('../models/Class');

const getClasses = async (req, res) => {
  try {
    const { level, schedule, fee } = req.query;
    let filter = { isActive: true };

    if (level && level !== 'all') {
      filter.level = level;
    }

    const classes = await Class.find(filter).sort({ level: 1 });
    
    res.json({
      success: true,
      data: classes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching classes',
      error: error.message
    });
  }
};

const createClass = async (req, res) => {
  try {
    const classData = new Class(req.body);
    await classData.save();
    
    res.status(201).json({
      success: true,
      message: 'Class created successfully',
      data: classData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating class',
      error: error.message
    });
  }
};

const updateClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }
    res.json({
      success: true,
      message: 'Class updated successfully',
      data: classData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating class',
      error: error.message
    });
  }
};

const deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({
      success: true,
      message: 'Class deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting class',
      error: error.message
    });
  }
};

module.exports = {
  getClasses,
  createClass,
  updateClass,
  deleteClass
};