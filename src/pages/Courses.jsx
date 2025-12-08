import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaVideo, FaLaptop } from 'react-icons/fa';
import './Courses.css';

const Courses = () => {
  return (
    <div className="container section">
      <div className="section-header">
        <h1 className="section-title">Nuestros Cursos</h1>
        <p className="section-subtitle">Elige la modalidad que mejor se adapte a tu estilo de aprendizaje.</p>
      </div>

      <div className="courses-grid">
        {/* Presenciales */}
        <div className="course-card">
          <div className="course-icon">
            <FaUserFriends />
          </div>
          <h3 className="course-title">Cursos Presenciales</h3>
          <p className="course-desc">
            Clases personalizadas en mi estudio. Perfecciona tu técnica con correcciones en tiempo real y atención al detalle.
          </p>
          <ul className="course-features">
            <li>Clases individuales o grupales</li>
            <li>Material impreso incluido</li>
            <li>Acceso a instrumentos de estudio</li>
          </ul>
          <Link to="/contacto" className="btn course-btn">Coordinar Clase</Link>
        </div>

        {/* On Demand */}
        <div className="course-card featured">
          <div className="course-icon">
            <FaVideo />
          </div>
          <h3 className="course-title">Cursos On Demand</h3>
          <p className="course-desc">
            Aprende a tu propio ritmo con nuestra biblioteca de videos grabados en alta definición. Acceso de por vida.
          </p>
          <ul className="course-features">
            <li>+50 horas de contenido</li>
            <li>Material descargable (PDF/Tabs)</li>
            <li>Soporte por email</li>
          </ul>
          <Link to="/cursos/catalogo" className="btn course-btn">Ver Catálogo</Link>
        </div>

        {/* Virtuales */}
        <div className="course-card">
          <div className="course-icon">
            <FaLaptop />
          </div>
          <h3 className="course-title">Clases Virtuales</h3>
          <p className="course-desc">
            La experiencia de una clase presencial desde la comodidad de tu hogar. Conéctate vía Zoom o Skype.
          </p>
          <ul className="course-features">
            <li>Horarios flexibles</li>
            <li>Grabación de la clase</li>
            <li>Feedback personalizado</li>
          </ul>
          <Link to="/contacto" className="btn course-btn">Agendar Cita</Link>
        </div>
      </div>
    </div>
  );
};

export default Courses;
