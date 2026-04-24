import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './BackendLayout.css';
import './BackendShared.css';

const BackendLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={`backend-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="mobile-toggle" onClick={toggleSidebar} aria-label="Menu">
        {isSidebarOpen ? '✕' : '☰'}
      </button>
      
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

      <aside className={`backend-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="backend-header">
          <h1>Admin Panel</h1>
          <p>Pablo Traberzo</p>
        </div>
        <nav className="backend-nav">
          <Link 
            to="/admin/news" 
            className={location.pathname === '/admin/news' ? 'active' : ''}
            onClick={closeSidebar}
          >
            Gestión de Noticias
          </Link>
          <Link 
            to="/admin/hero" 
            className={location.pathname === '/admin/hero' ? 'active' : ''}
            onClick={closeSidebar}
          >
            Gestión de Hero
          </Link>
          <Link 
            to="/admin/courses" 
            className={location.pathname === '/admin/courses' ? 'active' : ''}
            onClick={closeSidebar}
          >
            Gestión de Cursos
          </Link>
          <Link to="/" className="back-to-site" onClick={closeSidebar}>
            ← Volver al Sitio
          </Link>
        </nav>
      </aside>
      <main className="backend-main">
        <Outlet />
      </main>
    </div>
  );
};

export default BackendLayout;
