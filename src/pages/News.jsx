import React from 'react';
import { useApp } from '../context/AppContext';
import NewsCard from '../components/NewsCard';
import './News.css';

const News = () => {
  const { newsList, newsLoading } = useApp();

  return (
    <div className="container section">
      <div className="section-header">
        <h1 className="section-title">Noticias y Novedades</h1>
        <p className="section-subtitle">Mantente al día con los últimos eventos y lanzamientos.</p>
      </div>

      {newsLoading ? (
        <div className="loading">Cargando noticias...</div>
      ) : (
        <div className="news-grid">
          {newsList.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
