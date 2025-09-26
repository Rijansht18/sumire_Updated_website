const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Page = require('../models/Page');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding pages');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedPages = async () => {
  const pages = [
    {
      name: 'Home',
      title: 'Home - Sakura Japan Consultancy',
      slug: 'home',
      isVisible: true,
      content: {
        hero: {
          title: 'Your Gateway to Japan',
          subtitle: 'Expert guidance for studying, working, and living in Japan'
        }
      },
      seoMeta: {
        title: 'Sakura Japan Consultancy - Your Gateway to Japan',
        description: 'Expert guidance for studying, working, and living in Japan. Language classes, visa support, and university admissions.',
        keywords: ['Japan study abroad', 'Japanese language', 'Japan visa', 'Nepal to Japan']
      }
    },
    {
      name: 'About',
      title: 'About Us - Sakura Japan Consultancy',
      slug: 'about',
      isVisible: true,
      seoMeta: {
        title: 'About Sakura Japan Consultancy',
        description: 'Learn about our mission to help Nepalese students and professionals achieve their Japanese dreams.',
        keywords: ['About Sakura Japan', 'Japan consultancy Nepal', 'Study abroad consultancy']
      }
    },
    {
      name: 'Services',
      title: 'Our Services - Sakura Japan Consultancy',
      slug: 'services',
      isVisible: true,
      seoMeta: {
        title: 'Services - Study Abroad, Language Classes, Visa Support',
        description: 'Comprehensive services for Japan: Study abroad consultation, Japanese language classes, and work visa support.',
        keywords: ['Japan services', 'Study abroad', 'Japanese language classes', 'Work visa Japan']
      }
    },
    {
      name: 'Classes',
      title: 'Japanese Language Classes - Sakura Japan Consultancy',
      slug: 'classes',
      isVisible: true,
      seoMeta: {
        title: 'Japanese Language Classes - JLPT Preparation',
        description: 'Learn Japanese with expert instructors. N5 to N1 levels, JLPT preparation, and business Japanese courses.',
        keywords: ['Japanese language classes', 'JLPT preparation', 'Learn Japanese Nepal']
      }
    },
    {
      name: 'Gallery',
      title: 'Gallery - Sakura Japan Consultancy',
      slug: 'gallery',
      isVisible: true,
      seoMeta: {
        title: 'Gallery - Student Success Stories and Moments',
        description: 'View photos and videos of our students in Japan, classes, and success stories.',
        keywords: ['Japan student photos', 'Success stories', 'Student gallery']
      }
    },
    {
      name: 'Blog',
      title: 'Blog & Resources - Sakura Japan Consultancy',
      slug: 'blog',
      isVisible: true,
      seoMeta: {
        title: 'Blog - Japan Study and Work Guides',
        description: 'Latest insights, guides, and tips for studying and working in Japan.',
        keywords: ['Japan blog', 'Study guides', 'Japan tips', 'JLPT guides']
      }
    },
    {
      name: 'FAQ',
      title: 'FAQ - Sakura Japan Consultancy',
      slug: 'faq',
      isVisible: true,
      seoMeta: {
        title: 'Frequently Asked Questions - Japan Study Abroad',
        description: 'Find answers to common questions about studying and working in Japan.',
        keywords: ['Japan FAQ', 'Study abroad questions', 'Japan visa FAQ']
      }
    },
    {
      name: 'Contact',
      title: 'Contact Us - Sakura Japan Consultancy',
      slug: 'contact',
      isVisible: true,
      seoMeta: {
        title: 'Contact Sakura Japan Consultancy',
        description: 'Get in touch with our Japan education experts. Free consultation available.',
        keywords: ['Contact Japan consultancy', 'Free consultation', 'Japan education advice']
      }
    }
  ];

  try {
    await Page.deleteMany({});
    await Page.insertMany(pages);
    console.log('Pages seeded successfully');
  } catch (error) {
    console.error('Error seeding pages:', error);
  }
};

const seedAll = async () => {
  await connectDB();
  await seedPages();
  console.log('Page seeding completed');
  process.exit(0);
};

seedAll();