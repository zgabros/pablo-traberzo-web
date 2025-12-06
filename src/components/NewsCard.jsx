import React from 'react';
import { Link } from 'react-router-dom';
import YouTubeEmbed from './YouTubeEmbed';
import './NewsCard.css';

const NewsCard = ({ news }) => {
  // Truncate content to 150 characters for preview
  const getExcerpt = (content) => {
    if (content.length <= 150) return content;
    return content.substring(0, 150) + '...';
  };

  return (
    <div className="news-card">
      {/* Render image or YouTube video based on mediaType */}
      {news.mediaType === 'youtube' && news.youtubeUrl ? (
        <div className="news-video-container">
          <YouTubeEmbed url={news.youtubeUrl} />
        </div>
      ) : news.image ? (
        <div className="news-image-container">
          <img src={news.image} alt={news.title} className="news-image" />
        </div>
      ) : null}
      
      <div className="news-content">
        <span className="news-date">{news.date}</span>
        <h3 className="news-title">{news.title}</h3>
        <p className="news-excerpt">{getExcerpt(news.content)}</p>
        <Link to={`/noticias/${news.id}`} className="btn-outline news-btn">
          Leer más
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
