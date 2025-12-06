import React from 'react';
import './NewsCard.css';

const NewsCard = ({ news }) => {
  return (
    <div className="news-card">
      <div className="news-image-container">
        <img src={news.image} alt={news.title} className="news-image" />
      </div>
      <div className="news-content">
        <span className="news-date">{news.date}</span>
        <h3 className="news-title">{news.title}</h3>
        <p className="news-excerpt">{news.content}</p>
        <button className="btn-outline news-btn">Leer más</button>
      </div>
    </div>
  );
};

export default NewsCard;
