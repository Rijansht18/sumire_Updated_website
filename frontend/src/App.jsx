import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.css';
import './styles/animations.css';

import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import About from './pages/About';
import Services from './pages/Services';
import Classes from './pages/Classes';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import Events from './pages/Events';
import StudyAbroad from './pages/StudyAbroad';
import WorkVisa from './pages/WorkVisa';
import Destinations from './pages/Destinations';
import Scholarships from './pages/Scholarships';
import LivingGuide from './pages/LivingGuide';
import Enroll from './pages/Enroll';

// Admin Components
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/Dashboard';
import AdminContacts from './admin/pages/Contacts';
import AdminClasses from './admin/pages/Classes';
import AdminSettings from './admin/pages/Settings';
import AdminUniversities from './admin/pages/Universities';
import AdminEnrollments from './admin/pages/Enrollments';
import AdminScholarships from './admin/pages/Scholarships';
import AdminBlog from './admin/pages/Blog';
import AdminGallery from './admin/pages/Gallery';
import AdminEvents from './admin/pages/Events';
import AdminPages from './admin/pages/Pages';
import SiteSettings from './admin/pages/SiteSettings';
import Home from './pages/Home/index';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminLoggedIn(false);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={
            !isAdminLoggedIn ? (
              <AdminLogin onLogin={setIsAdminLoggedIn} />
            ) : (
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            )
          } />
          
          <Route path="/admin" element={
            isAdminLoggedIn ? (
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            ) : (
              <AdminLogin onLogin={setIsAdminLoggedIn} />
            )
          } />
          
          <Route path="/admin/contacts" element={
            isAdminLoggedIn ? (
              <AdminLayout>
                <AdminContacts />
              </AdminLayout>
            ) : (
              <AdminLogin onLogin={setIsAdminLoggedIn} />
            )
          } />
          
          <Route path="/admin/classes" element={
            isAdminLoggedIn ? (
              <AdminLayout>
                <AdminClasses />
              </AdminLayout>
            ) : (
              <AdminLogin onLogin={setIsAdminLoggedIn} />
            )
          } />
          
          <Route path="/admin/settings" element={
            isAdminLoggedIn ? (
              <AdminLayout>
                <AdminSettings />
              </AdminLayout>
            ) : (
              <AdminLogin onLogin={setIsAdminLoggedIn} />
            )
          } />
          
          <Route path="/admin/universities" element={
            isAdminLoggedIn ? (
              <AdminLayout>
                <AdminUniversities />
              </AdminLayout>
            ) : (
              <AdminLogin onLogin={setIsAdminLoggedIn} />
            )
          } />
          
          <Route path="/admin/enrollments" element={
            isAdminLoggedIn ? (
              <AdminLayout>
                <AdminEnrollments />
              </AdminLayout>
            ) : (
              <AdminLogin onLogin={setIsAdminLoggedIn} />
            )
          } />
          
          <Route path="/admin/scholarships" element={
            isAdminLoggedIn ? (
              <AdminLayout>
                <AdminScholarships />
              </AdminLayout>
            ) : (
              <AdminLogin onLogin={setIsAdminLoggedIn} />
            )
          } />
          
          <Route path="/admin/blog" element={
            isAdminLoggedIn ? (
              <AdminLayout>
                <AdminBlog />
              </AdminLayout>
            ) : (
              <AdminLogin onLogin={setIsAdminLoggedIn} />
            )
          } />
          
          <Route path="/admin/gallery" element={
            isAdminLoggedIn ? (
              <AdminLayout>
                <AdminGallery />
              </AdminLayout>
            ) : (
              <AdminLogin onLogin={setIsAdminLoggedIn} />
            )
          } />
          
          <Route path="/admin/events" element={
            isAdminLoggedIn ? (
              <AdminLayout>
                <AdminEvents />
              </AdminLayout>
            ) : (
              <AdminLogin onLogin={setIsAdminLoggedIn} />
            )
          } />
          
          <Route path="/admin/pages" element={
            isAdminLoggedIn ? (
              <AdminLayout>
                <AdminPages />
              </AdminLayout>
            ) : (
              <AdminLogin onLogin={setIsAdminLoggedIn} />
            )
          } />
          
          <Route path="/admin/site-settings" element={
            isAdminLoggedIn ? (
              <AdminLayout>
                <SiteSettings />
              </AdminLayout>
            ) : (
              <AdminLogin onLogin={setIsAdminLoggedIn} />
            )
          } />

          {/* Public Routes */}
          <Route path="/*" element={
            <>
              <NavigationBar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/study-abroad" element={<StudyAbroad />} />
                  <Route path="/work-visa" element={<WorkVisa />} />
                  <Route path="/classes" element={<Classes />} />
                  <Route path="/destinations" element={<Destinations />} />
                  <Route path="/scholarships" element={<Scholarships />} />
                  <Route path="/living-guide" element={<LivingGuide />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/enroll" element={<Enroll />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;