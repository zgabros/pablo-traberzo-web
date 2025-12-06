import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import News from './pages/News';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Login from './pages/Login';
import BackendLayout from './pages/backend/BackendLayout';
import NewsManagement from './pages/backend/NewsManagement';
import HeroManagement from './pages/backend/HeroManagement';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="noticias" element={<News />} />
          <Route path="cursos" element={<Courses />} />
          <Route path="contacto" element={<Contact />} />
        </Route>

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Backend Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <BackendLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/news" replace />} />
          <Route path="news" element={<NewsManagement />} />
          <Route path="hero" element={<HeroManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
