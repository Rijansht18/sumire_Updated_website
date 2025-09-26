const express = require('express');
const router = express.Router();
const {
  getPages,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
  getPageStats
} = require('../controllers/pageController');

// Public routes
router.get('/stats', getPageStats);
router.get('/slug/:slug', getPageBySlug);

// Admin routes (add authentication middleware as needed)
router.get('/', getPages);
router.post('/', createPage);
router.put('/:id', updatePage);
router.delete('/:id', deletePage);

module.exports = router;