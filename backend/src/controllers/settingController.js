const Setting = require('../models/Setting');

// Get all settings
const getSettings = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    
    const settings = await Setting.find(filter).select('-__v');
    
    // Convert to key-value object for easier frontend consumption
    const settingsObject = {};
    settings.forEach(setting => {
      settingsObject[setting.key] = setting.value;
    });
    
    res.json(settingsObject);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings', error: error.message });
  }
};

// Get single setting
const getSetting = async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });
    
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching setting', error: error.message });
  }
};

// Update multiple settings
const updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    const results = [];
    
    for (const [key, value] of Object.entries(updates)) {
      const setting = await Setting.findOneAndUpdate(
        { key },
        { 
          key, 
          value, 
          type: typeof value,
          category: getCategoryForKey(key)
        },
        { 
          new: true, 
          upsert: true, 
          runValidators: true 
        }
      );
      results.push(setting);
    }
    
    res.json({ message: 'Settings updated successfully', results });
  } catch (error) {
    res.status(400).json({ message: 'Error updating settings', error: error.message });
  }
};

// Update single setting
const updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value, category, description } = req.body;
    
    const setting = await Setting.findOneAndUpdate(
      { key },
      { 
        key, 
        value, 
        type: typeof value,
        category: category || getCategoryForKey(key),
        description
      },
      { 
        new: true, 
        upsert: true, 
        runValidators: true 
      }
    );
    
    res.json(setting);
  } catch (error) {
    res.status(400).json({ message: 'Error updating setting', error: error.message });
  }
};

// Delete setting
const deleteSetting = async (req, res) => {
  try {
    const setting = await Setting.findOneAndDelete({ key: req.params.key });
    
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    
    res.json({ message: 'Setting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting setting', error: error.message });
  }
};

// Helper function to categorize settings
const getCategoryForKey = (key) => {
  const categoryMap = {
    // General
    siteName: 'general',
    siteDescription: 'general',
    siteKeywords: 'general',
    metaTitle: 'seo',
    metaDescription: 'seo',
    
    // Contact
    email: 'contact',
    phone: 'contact',
    address: 'contact',
    businessHours: 'contact',
    
    // Social
    facebook: 'social',
    twitter: 'social',
    instagram: 'social',
    linkedin: 'social',
    
    // Email
    emailHost: 'email',
    emailPort: 'email',
    emailUser: 'email',
    emailPassword: 'email',
    
    // Analytics
    googleAnalyticsId: 'analytics',
    facebookPixelId: 'analytics',
    
    // Maintenance
    maintenanceMode: 'maintenance',
    maintenanceMessage: 'maintenance'
  };
  
  return categoryMap[key] || 'general';
};

// Initialize default settings
const initializeDefaultSettings = async () => {
  const defaultSettings = [
    { key: 'siteName', value: 'Sakura Japan Consultancy', category: 'general' },
    { key: 'siteDescription', value: 'Your trusted partner for studying, working, and living in Japan', category: 'general' },
    { key: 'email', value: 'info@sakurajapan.com', category: 'contact' },
    { key: 'phone', value: '+81-3-XXXX-XXXX', category: 'contact' },
    { key: 'address', value: 'Tokyo, Japan & International Offices', category: 'contact' },
    { key: 'businessHours', value: 'Mon-Fri: 9:00 AM - 6:00 PM JST', category: 'contact' },
    { key: 'maintenanceMode', value: false, category: 'maintenance' },
    { key: 'maintenanceMessage', value: 'We are currently performing scheduled maintenance. Please check back soon.', category: 'maintenance' }
  ];
  
  for (const setting of defaultSettings) {
    await Setting.findOneAndUpdate(
      { key: setting.key },
      { ...setting, type: typeof setting.value },
      { upsert: true }
    );
  }
};

module.exports = {
  getSettings,
  getSetting,
  updateSettings,
  updateSetting,
  deleteSetting,
  initializeDefaultSettings
};