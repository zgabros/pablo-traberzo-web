import React, { useState } from 'react';
import { cloudinaryConfig } from '../config/cloudinaryConfig';
import './ImageUpload.css';

const ImageUpload = ({ onUpload, currentImage, label = "Imagen" }) => {
  const [uploading, setUploading] = useState(false);

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

  return (
    <div className="image-upload-container">
      <label className="image-upload-label">{label}</label>
      
      {currentImage && (
        <div className="image-preview">
          <img src={currentImage} alt="Preview" />
        </div>
      )}

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
    </div>
  );
};

export default ImageUpload;
