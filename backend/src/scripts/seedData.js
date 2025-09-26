const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Class = require('../models/Class');
const Admin = require('../models/Admin');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedClasses = async () => {
  const classes = [
    {
      title: "Japanese N5 Beginner",
      level: "N5",
      schedule: "Mon, Wed, Fri - 6:00 PM",
      teacher: "Tanaka Sensei",
      batchSize: 10,
      fee: 15000,
      duration: "3 months",
      description: "Perfect for absolute beginners. Learn basic hiragana, katakana, and essential vocabulary."
    },
    {
      title: "Japanese N4 Elementary",
      level: "N4",
      schedule: "Tue, Thu, Sat - 7:00 PM",
      teacher: "Yamada Sensei",
      batchSize: 8,
      fee: 18000,
      duration: "4 months",
      description: "Build on N5 foundation with more complex grammar and expanded vocabulary."
    },
    {
      title: "Japanese N3 Intermediate",
      level: "N3",
      schedule: "Mon, Wed, Fri - 7:30 PM",
      teacher: "Sato Sensei",
      batchSize: 6,
      fee: 22000,
      duration: "5 months",
      description: "Intermediate level focusing on kanji, complex grammar, and conversation skills."
    },
    {
      title: "Japanese N2 Upper-Intermediate",
      level: "N2",
      schedule: "Tue, Thu, Sat - 6:30 PM",
      teacher: "Suzuki Sensei",
      batchSize: 6,
      fee: 25000,
      duration: "6 months",
      description: "Advanced grammar, extensive kanji knowledge, and business communication."
    },
    {
      title: "Japanese N1 Advanced",
      level: "N1",
      schedule: "Weekend Intensive",
      teacher: "Watanabe Sensei",
      batchSize: 4,
      fee: 30000,
      duration: "8 months",
      description: "Highest level of Japanese proficiency with complex texts and nuanced expressions."
    },
    {
      title: "Business Japanese",
      level: "Business",
      schedule: "Flexible Online",
      teacher: "Kobayashi Sensei",
      batchSize: 5,
      fee: 28000,
      duration: "4 months",
      description: "Specialized course for business communication, presentations, and workplace etiquette."
    }
  ];

  try {
    await Class.deleteMany({});
    await Class.insertMany(classes);
    console.log('Classes seeded successfully');
  } catch (error) {
    console.error('Error seeding classes:', error);
  }
};

const seedAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      await Admin.create({
        username: 'admin',
        password: 'admin123',
        role: 'super_admin'
      });
      console.log('Admin user created: admin/admin123');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin:', error);
  }
};

const seedAll = async () => {
  await connectDB();
  await seedClasses();
  await seedAdmin();
  console.log('Database seeding completed');
  process.exit(0);
};

seedAll();