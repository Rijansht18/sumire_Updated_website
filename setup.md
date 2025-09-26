# Sakura Japan Consultancy - Setup Guide

## Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
npm run seed    # Seeds database with sample data
npm run dev     # Starts development server
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start       # Starts React development server
```

### 3. Access Points
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **API**: http://localhost:5000/api

### 4. Admin Credentials
- **Username**: admin
- **Password**: admin123

## Features Implemented

### Frontend
✅ Clean navbar with organized dropdowns
✅ Responsive design with Japanese aesthetic
✅ Home page with hero, services, testimonials
✅ Services page with detailed offerings
✅ Classes page with filtering and API integration
✅ Contact form with backend integration
✅ About page with company story
✅ FAQ page with accordion layout
✅ Admin panel with dashboard, contacts, classes management

### Backend
✅ Express.js API with MongoDB
✅ Contact form handling with email notifications
✅ Classes CRUD operations
✅ Admin authentication with JWT
✅ Database seeding script
✅ Input validation and error handling

### Admin Panel
✅ Dashboard with statistics
✅ Contact inquiries management
✅ Classes management (CRUD)
✅ Responsive admin interface

## Database Schema

### Collections
- **contacts**: Customer inquiries
- **classes**: Japanese language classes
- **admins**: Admin users

## API Endpoints

### Public
- `GET /api/health` - Health check
- `POST /api/contact` - Submit contact form
- `GET /api/classes` - Get classes with filters
- `GET /api/services` - Get services list

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/contact` - Get all contacts
- `POST /api/classes` - Create new class

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sakura_japan
JWT_SECRET=your_jwt_secret_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Design System

### Colors (70-20-10 Rule)
- **70% White**: #FFFFFF (backgrounds)
- **20% Charcoal**: #2C2C2C (structure, text)
- **10% Accents**: #E53E3E (red), #FBB6CE (pink)

### Typography
- **Headings**: Noto Serif JP
- **Body**: Inter, Noto Sans JP
- **Scale**: 12/14/16/20/24/32/48px

### Components
- Rounded corners (12-16px)
- Soft shadows with large blur
- Hover animations (translateY + shadow)
- Focus states with pink outline

## Next Steps

1. Configure email service in backend/.env
2. Set up MongoDB database
3. Customize content and styling
4. Add more pages (Gallery, Blog, Events)
5. Implement file upload for gallery
6. Add more admin features
7. Deploy to production