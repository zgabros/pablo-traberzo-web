import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './BackendLayout.css';

const BackendLayout = () => {
  const location = useLocation();

  return (
    <div className="backend-layout">
      <aside className="backend-sidebar">
        <div className="backend-header">
          <h1>Admin Panel</h1>
          <p>Pablo Traberzo</p>
        </div>
        <nav className="backend-nav">
          <Link 
            to="/admin/news" 
            className={location.pathname === '/admin/news' ? 'active' : ''}
          >
            📰 Gestión de Noticias
          </Link>
          <Link 
            to="/admin/hero" 
            className={location.pathname === '/admin/hero' ? 'active' : ''}
          >
            🎸 Gestión de Hero
          </Link>
          <Link to="/" className="back-to-site">
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
