const express = require('express');
const { body } = require('express-validator');
const { createContact, getContacts } = require('../controllers/contactController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('purpose').isIn(['study-abroad', 'language-classes', 'work-visa', 'general']).withMessage('Valid purpose is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
];

router.post('/', contactValidation, validateRequest, createContact);
router.get('/', getContacts);

module.exports = router;