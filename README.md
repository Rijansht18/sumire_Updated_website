# Sakura Japan Consultancy Website

A modern, responsive website for a Japan consultancy service built with React.js frontend and Node.js backend.

## Features

- **70-20-10 Color Design**: White backgrounds (70%), charcoal structure (20%), red/pink accents (10%)
- **Japanese Aesthetic**: Sakura motifs, Mount Fuji elements, circular framing
- **Responsive Design**: Mobile-first approach with Bootstrap
- **Accessibility**: AA contrast compliance, focus states, reduced motion support

## Tech Stack

### Frontend
- React.js 18
- React Bootstrap
- React Router DOM
- Lucide React (icons)
- Custom CSS with Japanese design elements

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Nodemailer for email services

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS and theme files
│   │   └── assets/        # Images and static files
│   └── public/
└── backend/
    ├── src/
    │   ├── configs/       # Database and app configuration
    │   ├── controllers/   # Route handlers
    │   ├── middleware/    # Custom middleware
    │   ├── models/        # MongoDB schemas
    │   ├── routes/        # API routes
    │   └── service/       # Business logic services
    └── .env
```

## Installation

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sakura_japan
JWT_SECRET=your_jwt_secret_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

## Design System

### Colors
- Primary White: #FFFFFF (70% usage)
- Primary Dark: #2C2C2C (20% usage)
- Accent Red: #E53E3E (10% usage)
- Accent Pink: #FBB6CE (10% usage)

### Typography
- Headings: Noto Serif JP
- Body: Inter / Noto Sans JP
- Scale: 12/14/16/20/24/32/48px

### Components
- Rounded corners (12-16px)
- Soft shadows with large blur
- Hover animations (translateY + shadow)
- Focus states with pink outline

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts
- `GET /api/classes` - Get language classes
- `GET /api/services` - Get services list

## License

Private project for Sakura Japan Consultancy