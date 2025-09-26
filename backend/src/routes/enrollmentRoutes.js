const express = require('express');
const { 
  createEnrollment, 
  getEnrollments, 
  updateEnrollmentStatus 
} = require('../controllers/enrollmentController');

const router = express.Router();

router.post('/', createEnrollment);
router.get('/', getEnrollments);
router.put('/:id/status', updateEnrollmentStatus);

module.exports = router;