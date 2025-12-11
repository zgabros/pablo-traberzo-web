import React, { useState } from 'react';
import { cloudinaryConfig } from '../config/cloudinaryConfig';
import './ImageUpload.css';

const ImageUpload = ({ onUpload, currentImage, label = "Imagen" }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState('upload'); // 'upload' or 'url'
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState('');

  const openUploadWidget = () => {
    setUploading(true);

    // Create Cloudinary upload widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudinaryConfig.cloudName,
        uploadPreset: cloudinaryConfig.uploadPreset,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        maxFiles: 1,
        clientAllowedFormats: ['jpg', 'png', 'webp', 'gif'],
        maxFileSize: 10000000, // 10MB
        cropping: true,
        croppingAspectRatio: 16 / 9,
        croppingShowDimensions: true,
        folder: 'pablo-traberzo',
        resourceType: 'image',
        theme: 'minimal',
      },
      (error, result) => {
        setUploading(false);

        if (error) {
          console.error('Upload error:', error);
          alert('Error al subir la imagen. Por favor, intenta nuevamente.');
          return;
        }

        if (result.event === 'success') {
          const imageUrl = result.info.secure_url;
          
          // Optimize URL with transformations
          const optimizedUrl = imageUrl.replace(
            '/upload/',
            '/upload/f_auto,q_auto,w_1200/'
          );

          onUpload(optimizedUrl);
          widget.close();
        }
      }
    );

    widget.open();
  };

  const handleUrlSubmit = () => {
    // Validate URL
    if (!urlInput.trim()) {
      setUrlError('Por favor ingresa una URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(urlInput);
      setUrlError('');
      onUpload(urlInput);
      setUrlInput('');
    } catch (e) {
      setUrlError('URL inválida. Debe comenzar con http:// o https://');
    }
  };

  const handleUrlChange = (e) => {
    setUrlInput(e.target.value);
    setUrlError('');
  };

  return (
    <div className="image-upload-container">
      <label className="image-upload-label">{label}</label>
      
      {/* Mode toggle */}
      <div className="upload-mode-toggle">
        <button
          type="button"
          className={`mode-btn ${uploadMode === 'upload' ? 'active' : ''}`}
          onClick={() => setUploadMode('upload')}
        >
          📤 Subir Archivo
        </button>
        <button
          type="button"
          className={`mode-btn ${uploadMode === 'url' ? 'active' : ''}`}
          onClick={() => setUploadMode('url')}
        >
          🔗 Usar URL
        </button>
      </div>

      {currentImage && (
        <div className="image-preview">
          <img src={currentImage} alt="Preview" />
        </div>
      )}

      {uploadMode === 'upload' ? (
        // Upload mode
        <>
          <button
            type="button"
            onClick={openUploadWidget}
            className="upload-button"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <span className="spinner-small"></span>
                Subiendo...
              </>
            ) : (
              <>
                📷 {currentImage ? 'Cambiar Imagen' : 'Subir Imagen'}
              </>
            )}
          </button>

          <p className="upload-hint">
            Formatos: JPG, PNG, WebP, GIF. Máximo 10MB.
          </p>
        </>
      ) : (
        // URL mode
        <div className="url-input-container">
          <input
            type="url"
            value={urlInput}
            onChange={handleUrlChange}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="url-input"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="url-submit-btn"
          >
            Usar URL
          </button>
          {urlError && <p className="url-error">{urlError}</p>}
          <p className="upload-hint">
            Pega la URL de una imagen (Google Photos, Dropbox, etc.)
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
