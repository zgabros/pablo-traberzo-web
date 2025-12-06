import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import YouTubeEmbed from '../components/YouTubeEmbed';
import './NewsDetail.css';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { newsList, newsLoading } = useApp();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    if (newsList.length > 0) {
      const item = newsList.find(news => news.id === id);
      if (item) {
        setNewsItem(item);
      } else {
        // Si no se encuentra la noticia, redirigir a noticias
        navigate('/noticias');
      }
    }
  }, [id, newsList, navigate]);

  if (newsLoading) {
    return (
      <div className="news-detail-container">
        <div className="loading">Cargando noticia...</div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="news-detail-container">
        <div className="loading">Noticia no encontrada...</div>
      </div>
    );
  }

  return (
    <div className="news-detail-container">
      <div className="news-detail-content">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Inicio</Link>
          <span className="separator">›</span>
          <Link to="/noticias">Noticias</Link>
          <span className="separator">›</span>
          <span className="current">{newsItem.title}</span>
        </nav>

        {/* Back button */}
        <button 
          onClick={() => navigate('/noticias')} 
          className="btn-back"
        >
          ← Volver a Noticias
        </button>

        {/* Article */}
        <article className="news-article">
          <header className="article-header">
            <h1>{newsItem.title}</h1>
            <time className="article-date" dateTime={newsItem.date}>
              {new Date(newsItem.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </header>

          {/* Render image or YouTube video based on mediaType */}
          {newsItem.mediaType === 'youtube' && newsItem.youtubeUrl ? (
            <div className="article-video">
              <YouTubeEmbed url={newsItem.youtubeUrl} />
            </div>
          ) : newsItem.image ? (
            <div className="article-image">
              <img src={newsItem.image} alt={newsItem.title} />
            </div>
          ) : null}

          <div className="article-body">
            <p>{newsItem.content}</p>
          </div>
        </article>

        {/* Share buttons (optional) */}
        <div className="article-footer">
          <button 
            onClick={() => navigate('/noticias')} 
            className="btn-back-bottom"
          >
            ← Volver a Noticias
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
