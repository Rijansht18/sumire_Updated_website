const express = require('express');
const router = express.Router();
const {
  getSettings,
  getSetting,
  updateSettings,
  updateSetting,
  deleteSetting
} = require('../controllers/settingController');

// Public routes (for frontend to get basic settings)
router.get('/public', getSettings);

// Admin routes (add authentication middleware as needed)
router.get('/', getSettings);
router.get('/:key', getSetting);
router.put('/', updateSettings);
router.put('/:key', updateSetting);
router.delete('/:key', deleteSetting);

module.exports = router;