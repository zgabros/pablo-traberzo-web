import React from 'react';
import { useApp } from '../context/AppContext';
import './CoursesCatalog.css';

const CoursesCatalog = () => {
  const { coursesList, coursesLoading } = useApp();

  const getLevelColor = (level) => {
    switch (level) {
      case 'Principiante':
        return 'level-beginner';
      case 'Intermedio':
        return 'level-intermediate';
      case 'Avanzado':
        return 'level-advanced';
      default:
        return '';
    }
  };

  if (coursesLoading) {
    return (
      <div className="container section">
        <div className="loading">Cargando cursos...</div>
      </div>
    );
  }

  return (
    <div className="container section">
      <div className="section-header">
        <h1 className="section-title">Catálogo de Cursos</h1>
        <p className="section-subtitle">
          Aprende guitarra flamenca con cursos estructurados y profesionales
        </p>
      </div>

      {coursesList.length === 0 ? (
        <div className="empty-state">
          <p>No hay cursos disponibles en este momento.</p>
        </div>
      ) : (
        <div className="courses-grid">
          {coursesList.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-image-container">
                <img src={course.image} alt={course.title} className="course-image" />
                <span className={`course-level ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
              </div>

              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>

                <div className="course-meta">
                  <div className="meta-item">
                    <span className="meta-icon">⏱️</span>
                    <span className="meta-text">{course.duration}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">📚</span>
                    <span className="meta-text">{course.lessons}</span>
                  </div>
                </div>

                <div className="course-footer">
                  <span className="course-price">{course.price}</span>
                  <a
                    href={course.gumroadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary course-btn"
                  >
                    Comprar Curso
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesCatalog;
