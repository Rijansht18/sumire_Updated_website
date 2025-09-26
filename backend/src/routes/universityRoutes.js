const express = require('express');
const { 
  getUniversities, 
  createUniversity, 
  updateUniversity, 
  deleteUniversity 
} = require('../controllers/universityController');

const router = express.Router();

router.get('/', getUniversities);
router.post('/', createUniversity);
router.put('/:id', updateUniversity);
router.delete('/:id', deleteUniversity);

module.exports = router;