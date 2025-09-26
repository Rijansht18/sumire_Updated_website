const mongoose = require('mongoose');
const University = require('../models/University');
require('dotenv').config();

const universities = [
  {
    name: "University of Tokyo",
    location: "Tokyo",
    ranking: "#1 in Japan",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
    programs: ["Engineering", "Medicine", "Business", "Science", "Law"],
    tuitionFee: { min: 535800, max: 1200000 },
    requirements: { gpa: 3.5, jlptLevel: "N2", englishTest: "TOEFL 80+" },
    description: "Japan's most prestigious university, known for academic excellence and research innovation.",
    website: "https://www.u-tokyo.ac.jp/en/"
  },
  {
    name: "Kyoto University",
    location: "Kyoto",
    ranking: "#2 in Japan",
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=250&fit=crop",
    programs: ["Science", "Arts", "Law", "Medicine", "Engineering"],
    tuitionFee: { min: 535800, max: 1000000 },
    requirements: { gpa: 3.3, jlptLevel: "N2", englishTest: "TOEFL 75+" },
    description: "Historic university known for liberal academic traditions and Nobel Prize winners.",
    website: "https://www.kyoto-u.ac.jp/en"
  },
  {
    name: "Osaka University",
    location: "Osaka",
    ranking: "#3 in Japan",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=250&fit=crop",
    programs: ["Technology", "Medicine", "Economics", "Engineering", "Science"],
    tuitionFee: { min: 535800, max: 900000 },
    requirements: { gpa: 3.2, jlptLevel: "N3", englishTest: "TOEFL 70+" },
    description: "Leading research university with strong international programs.",
    website: "https://www.osaka-u.ac.jp/en"
  },
  {
    name: "Waseda University",
    location: "Tokyo",
    ranking: "#4 in Japan",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop",
    programs: ["Business", "International Studies", "Political Science", "Literature", "Engineering"],
    tuitionFee: { min: 800000, max: 1500000 },
    requirements: { gpa: 3.0, jlptLevel: "N2", englishTest: "TOEFL 70+" },
    description: "Private university renowned for international programs and business education.",
    website: "https://www.waseda.jp/top/en"
  },
  {
    name: "Keio University",
    location: "Tokyo",
    ranking: "#5 in Japan",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=250&fit=crop",
    programs: ["Economics", "Business", "Medicine", "Law", "Science"],
    tuitionFee: { min: 900000, max: 1600000 },
    requirements: { gpa: 3.2, jlptLevel: "N2", englishTest: "TOEFL 75+" },
    description: "Prestigious private university with strong alumni network in business and politics.",
    website: "https://www.keio.ac.jp/en/"
  }
];

const seedUniversities = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await University.deleteMany({});
    console.log('Cleared existing universities');

    await University.insertMany(universities);
    console.log('Universities seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding universities:', error);
    process.exit(1);
  }
};

seedUniversities();