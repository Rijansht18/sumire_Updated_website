const express = require('express');
const { body } = require('express-validator');
const { login, getStats } = require('../controllers/adminController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

const loginValidation = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').trim().notEmpty().withMessage('Password is required')
];

router.post('/login', loginValidation, validateRequest, login);
router.get('/stats', getStats);

module.exports = router;