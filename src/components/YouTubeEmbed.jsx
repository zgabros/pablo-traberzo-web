import React from 'react';
import './YouTubeEmbed.css';

const YouTubeEmbed = ({ url }) => {
  // Extract video ID from different YouTube URL formats
  const getYouTubeId = (url) => {
    if (!url) return null;

    const patterns = [
      /youtu\.be\/([^?]+)/,                    // youtu.be/VIDEO_ID
      /youtube\.com\/watch\?v=([^&]+)/,        // youtube.com/watch?v=VIDEO_ID
      /youtube\.com\/embed\/([^?]+)/,          // youtube.com/embed/VIDEO_ID
      /youtube\.com\/v\/([^?]+)/,              // youtube.com/v/VIDEO_ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  };

  const videoId = getYouTubeId(url);

  if (!videoId) {
    return (
      <div className="youtube-error">
        <p>URL de YouTube inválida</p>
      </div>
    );
  }

  return (
    <div className="youtube-embed-container">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="youtube-iframe"
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
