import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaGuitar, FaUserCircle, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navLinks = [
    { title: 'Inicio', path: '/' },
    { title: 'Noticias', path: '/noticias' },
    { title: 'Cursos', path: '/cursos' },
    { title: 'Contacto', path: '/contacto' },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <FaGuitar className="logo-icon" />
          <span>Pablo Traberzo</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          {navLinks.map((link, index) => (
            <li key={index} className="nav-item">
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active-link' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </Link>
            </li>
          ))}

          {/* User Authentication Section */}
          {user ? (
            <li className="nav-item user-menu-item">
              <div className="user-menu">
                <button 
                  className="user-button" 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="user-avatar" />
                  ) : (
                    <FaUserCircle className="user-icon" />
                  )}
                  <span className="user-name">{user.displayName || 'Usuario'}</span>
                </button>

                {showUserMenu && (
                  <div className="user-dropdown">
                    {isAdmin() && (
                      <Link 
                        to="/admin" 
                        className="dropdown-item"
                        onClick={() => {
                          setShowUserMenu(false);
                          setIsOpen(false);
                        }}
                      >
                        <FaCog /> Admin Panel
                      </Link>
                    )}
                    <button 
                      className="dropdown-item logout-btn" 
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt /> Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
