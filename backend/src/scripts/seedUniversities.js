const mongoose = require('mongoose');
const dotenv = require('dotenv');
const University = require('../models/University');
const Scholarship = require('../models/Scholarship');

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

const seedUniversities = async () => {
  const universities = [
    {
      name: "University of Tokyo",
      location: "Tokyo",
      ranking: "#1 in Japan",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
      programs: ["Engineering", "Medicine", "Business", "Science", "Law"],
      tuitionFee: { min: 535800, max: 1200000 },
      requirements: {
        gpa: 3.5,
        jlptLevel: "N2",
        englishTest: "TOEFL 80+"
      },
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
      requirements: {
        gpa: 3.3,
        jlptLevel: "N2",
        englishTest: "TOEFL 75+"
      },
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
      requirements: {
        gpa: 3.2,
        jlptLevel: "N3",
        englishTest: "TOEFL 70+"
      },
      description: "Leading research university with strong international programs.",
      website: "https://www.osaka-u.ac.jp/en"
    }
  ];

  try {
    await University.deleteMany({});
    await University.insertMany(universities);
    console.log('Universities seeded successfully');
  } catch (error) {
    console.error('Error seeding universities:', error);
  }
};

const seedScholarships = async () => {
  const scholarships = [
    {
      name: "MEXT Scholarship",
      provider: "Japanese Government",
      amount: "Full tuition + Monthly allowance ¥143,000",
      deadline: new Date("2024-05-31"),
      description: "The most prestigious scholarship for international students in Japan covering full tuition and living expenses.",
      eligibility: ["Bachelor's degree", "Under 35 years", "Strong academic record", "Research proposal"],
      requirements: ["Academic transcripts", "Research proposal", "Language proficiency certificate", "Recommendation letters"],
      applicationLink: "https://www.mext.go.jp/en/policy/education/highered/title02/detail02/sdetail02/1373897.htm"
    },
    {
      name: "JASSO Scholarship",
      provider: "Japan Student Services Organization",
      amount: "¥48,000 - ¥80,000 per month",
      deadline: new Date("2024-04-15"),
      description: "Support for international students with excellent academic performance studying in Japan.",
      eligibility: ["Enrolled in Japanese university", "GPA 2.30 or above", "Financial need demonstrated"],
      requirements: ["Application form", "Academic records", "Financial documents", "Enrollment certificate"],
      applicationLink: "https://www.jasso.go.jp/en/study_j/scholarships/index.html"
    },
    {
      name: "University of Tokyo Scholarship",
      provider: "University of Tokyo",
      amount: "¥100,000 per month",
      deadline: new Date("2024-03-31"),
      description: "Merit-based scholarship for outstanding international students at the University of Tokyo.",
      eligibility: ["Admitted to UTokyo", "Excellent academic record", "Research potential", "Financial need"],
      requirements: ["Admission letter", "Research plan", "Recommendation letters", "Financial statement"],
      applicationLink: "https://www.u-tokyo.ac.jp/en/prospective-students/scholarships.html"
    }
  ];

  try {
    await Scholarship.deleteMany({});
    await Scholarship.insertMany(scholarships);
    console.log('Scholarships seeded successfully');
  } catch (error) {
    console.error('Error seeding scholarships:', error);
  }
};

const seedAll = async () => {
  await connectDB();
  await seedUniversities();
  await seedScholarships();
  console.log('All data seeded successfully');
  process.exit(0);
};

seedAll();