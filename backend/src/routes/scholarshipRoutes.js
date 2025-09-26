const express = require('express');
const { 
  getScholarships, 
  createScholarship, 
  updateScholarship 
} = require('../controllers/scholarshipController');

const router = express.Router();

router.get('/', getScholarships);
router.post('/', createScholarship);
router.put('/:id', updateScholarship);

module.exports = router;