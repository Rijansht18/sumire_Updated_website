const Page = require('../models/Page');

// Get all pages
const getPages = async (req, res) => {
  try {
    const { status, featured } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (featured !== undefined) filter.featured = featured === 'true';
    
    const pages = await Page.find(filter)
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pages', error: error.message });
  }
};

// Get single page by slug
const getPageBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, status: 'published' });
    
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    // Increment view count
    page.views += 1;
    await page.save();
    
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching page', error: error.message });
  }
};

// Create new page
const createPage = async (req, res) => {
  try {
    const { title, slug, content, metaDescription, status, featured } = req.body;
    
    // Check if slug already exists
    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      return res.status(400).json({ message: 'Page with this slug already exists' });
    }
    
    const page = new Page({
      title,
      slug,
      content,
      metaDescription,
      status,
      featured
    });
    
    await page.save();
    res.status(201).json(page);
  } catch (error) {
    res.status(400).json({ message: 'Error creating page', error: error.message });
  }
};

// Update page
const updatePage = async (req, res) => {
  try {
    const { title, slug, content, metaDescription, status, featured } = req.body;
    
    // Check if slug already exists (excluding current page)
    const existingPage = await Page.findOne({ slug, _id: { $ne: req.params.id } });
    if (existingPage) {
      return res.status(400).json({ message: 'Page with this slug already exists' });
    }
    
    const page = await Page.findByIdAndUpdate(
      req.params.id,
      { title, slug, content, metaDescription, status, featured },
      { new: true, runValidators: true }
    );
    
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    res.json(page);
  } catch (error) {
    res.status(400).json({ message: 'Error updating page', error: error.message });
  }
};

// Delete page
const deletePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting page', error: error.message });
  }
};

// Get page statistics
const getPageStats = async (req, res) => {
  try {
    const totalPages = await Page.countDocuments();
    const publishedPages = await Page.countDocuments({ status: 'published' });
    const draftPages = await Page.countDocuments({ status: 'draft' });
    const featuredPages = await Page.countDocuments({ featured: true });
    
    const topPages = await Page.find({ status: 'published' })
      .sort({ views: -1 })
      .limit(5)
      .select('title slug views');
    
    res.json({
      totalPages,
      publishedPages,
      draftPages,
      featuredPages,
      topPages
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching page statistics', error: error.message });
  }
};

module.exports = {
  getPages,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
  getPageStats
};