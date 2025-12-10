import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Home.css';

const Home = () => {
  const { heroData, heroLoading } = useApp();

  return (
    <div className="home">
      {/* Hero Section */}
      <section 
        className="hero"
        style={{
          backgroundImage: heroData.backgroundImage 
            ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroData.backgroundImage})`
            : undefined
        }}
      >
        <div className="hero-content container">
          <h1 className="hero-title">{heroData.title}</h1>
          <p className="hero-subtitle">{heroData.subtitle}</p>
          <div className="hero-buttons">
            <Link to="/cursos" className="btn">Ver Cursos</Link>
            <Link to="/contacto" className="btn btn-outline">Contáctame</Link>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="section bio-section">
        <div className="container bio-container">
          <div className="bio-image">
            <img src="https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Pablo Traberzo" />
          </div>
          <div className="bio-content">
            <h2 className="section-title">Sobre Mí</h2>
            <p className="bio-text">
              Con más de 30 años de experiencia en los escenarios y en la enseñanza, he dedicado mi vida a explorar las profundidades de la guitarra. Mi pasión abarca desde el flamenco tradicional hasta la fusión contemporánea.
            </p>
            <p className="bio-text">
              Como educador, mi objetivo es inspirar a mis estudiantes a encontrar su propia voz a través del instrumento, proporcionando una base técnica sólida y fomentando la creatividad musical.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
