import React, { useState } from 'react';
import { cloudinaryConfig } from '../config/cloudinaryConfig';
import './ImageUpload.css';

const ImageUpload = ({ onUpload, currentImage, label = "Imagen" }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState('upload'); // 'upload' or 'url'
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState('');

  const openUploadWidget = () => {
    // 1. Check if Cloudinary script is loaded
    if (!window.cloudinary) {
      console.error('Cloudinary script not loaded');
      alert('Error: El servicio de subida de imágenes no está disponible en este momento. Por favor recarga la página.');
      return;
    }

    // 2. Check for configuration
    if (!cloudinaryConfig.cloudName || cloudinaryConfig.cloudName === 'YOUR_CLOUD_NAME' || 
        !cloudinaryConfig.uploadPreset || cloudinaryConfig.uploadPreset === 'YOUR_UPLOAD_PRESET') {
      console.error('Cloudinary configuration missing');
      alert('Error de configuración: Faltan las credenciales de Cloudinary (Cloud Name o Upload Preset). Por favor contacta al administrador.');
      return;
    }

    setUploading(true);

    try {
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
          // Note: createUploadWidget callback handles both errors and success results
          if (error) {
            console.error('Upload widget error:', error);
            // Don't alert here immediately as some internal non-critical errors might trigger this
            if (error.statusText) {
               alert(`Error del servicio: ${error.statusText}`);
            }
            setUploading(false);
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
            setUploading(false);
            // widget.close() is handled automatically or by user action usually, 
            // but we can force it if desired. keeping behavior consistent.
            widget.close(); 
          }
          
          if (result.event === 'close') {
             setUploading(false);
          }
        }
      );

      widget.open();
    } catch (e) {
      console.error('Error creating upload widget:', e);
      setUploading(false);
      alert('Ocurrió un error al intentar abrir el cargador de imágenes. Detalle: ' + e.message);
    }
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
