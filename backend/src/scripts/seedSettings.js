const mongoose = require('mongoose');
const Setting = require('../models/Setting');
require('dotenv').config();

const defaultSettings = [
  // General Settings
  { key: 'siteName', value: 'Sakura Japan Consultancy', category: 'general', type: 'string' },
  { key: 'siteDescription', value: 'Your trusted partner for studying, working, and living in Japan. We provide comprehensive support for your Japanese journey.', category: 'general', type: 'string' },
  { key: 'siteKeywords', value: 'Japan, study abroad, work visa, language classes, consultancy, Tokyo, university, scholarship', category: 'seo', type: 'string' },
  { key: 'metaTitle', value: 'Sakura Japan Consultancy - Study & Work in Japan', category: 'seo', type: 'string' },
  { key: 'metaDescription', value: 'Expert guidance for studying, working, and living in Japan. Visa assistance, language classes, and comprehensive support services.', category: 'seo', type: 'string' },
  
  // Contact Information
  { key: 'email', value: 'info@sakurajapan.com', category: 'contact', type: 'string' },
  { key: 'phone', value: '+81-3-XXXX-XXXX', category: 'contact', type: 'string' },
  { key: 'address', value: 'Tokyo, Japan & International Offices', category: 'contact', type: 'string' },
  { key: 'businessHours', value: 'Mon-Fri: 9:00 AM - 6:00 PM JST', category: 'contact', type: 'string' },
  
  // Social Media
  { key: 'facebook', value: '', category: 'social', type: 'string' },
  { key: 'twitter', value: '', category: 'social', type: 'string' },
  { key: 'instagram', value: '', category: 'social', type: 'string' },
  { key: 'linkedin', value: '', category: 'social', type: 'string' },
  
  // Email Settings
  { key: 'emailHost', value: 'smtp.gmail.com', category: 'email', type: 'string' },
  { key: 'emailPort', value: '587', category: 'email', type: 'string' },
  { key: 'emailUser', value: '', category: 'email', type: 'string' },
  { key: 'emailPassword', value: '', category: 'email', type: 'string' },
  
  // Analytics
  { key: 'googleAnalyticsId', value: '', category: 'analytics', type: 'string' },
  { key: 'facebookPixelId', value: '', category: 'analytics', type: 'string' },
  
  // Maintenance
  { key: 'maintenanceMode', value: false, category: 'maintenance', type: 'boolean' },
  { key: 'maintenanceMessage', value: 'We are currently performing scheduled maintenance. Please check back soon.', category: 'maintenance', type: 'string' }
];

const seedSettings = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sakura_japan');
    console.log('Connected to MongoDB');

    // Clear existing settings
    await Setting.deleteMany({});
    console.log('Cleared existing settings');

    // Insert default settings
    for (const setting of defaultSettings) {
      await Setting.findOneAndUpdate(
        { key: setting.key },
        setting,
        { upsert: true, new: true }
      );
    }

    console.log(`Seeded ${defaultSettings.length} default settings`);
    
    // Display seeded settings
    const settings = await Setting.find().sort({ category: 1, key: 1 });
    console.log('\nSeeded Settings:');
    settings.forEach(setting => {
      console.log(`- ${setting.key}: ${setting.value} (${setting.category})`);
    });

  } catch (error) {
    console.error('Error seeding settings:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
};

// Run if called directly
if (require.main === module) {
  seedSettings();
}

module.exports = seedSettings;