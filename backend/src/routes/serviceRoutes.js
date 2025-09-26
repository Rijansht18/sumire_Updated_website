const express = require('express');
const router = express.Router();

const services = [
  {
    id: 1,
    title: "Study Abroad Consultation",
    description: "Complete guidance for your Japanese education journey",
    features: [
      "University selection and application",
      "Scholarship guidance and applications", 
      "Student visa processing",
      "Pre-departure orientation",
      "Accommodation assistance"
    ]
  },
  {
    id: 2,
    title: "Japanese Language Classes",
    description: "Master Japanese with our expert instructors",
    features: [
      "Beginner to Advanced levels",
      "JLPT preparation courses",
      "Small batch sizes (8-12 students)",
      "Native Japanese instructors",
      "Flexible timing options"
    ]
  },
  {
    id: 3,
    title: "Working Visa Support", 
    description: "Professional assistance for work opportunities in Japan",
    features: [
      "Job placement assistance",
      "Work visa application support",
      "Resume and interview preparation",
      "Company matching services",
      "Post-arrival support"
    ]
  }
];

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: services
  });
});

module.exports = router;