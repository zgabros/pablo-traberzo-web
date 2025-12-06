import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ImageUpload from '../../components/ImageUpload';
import './NewsManagement.css';

const NewsManagement = () => {
  const { newsList, newsLoading, addNews, editNews, removeNews } = useApp();
  const [editingId, setEditingId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mediaType: 'image', // 'image' or 'youtube'
    image: '',
    youtubeUrl: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    try {
      await addNews(formData);
      setFormData({ title: '', content: '', mediaType: 'image', image: '', youtubeUrl: '' });
      setShowCreateForm(false);
      alert('Noticia creada exitosamente');
    } catch (error) {
      console.error('Error creating news:', error);
      alert('Error al crear la noticia');
    }
  };

  const handleEdit = (newsItem) => {
    setEditingId(newsItem.id);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      mediaType: newsItem.mediaType || 'image',
      image: newsItem.image || '',
      youtubeUrl: newsItem.youtubeUrl || '',
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    try {
      await editNews(editingId, formData);
      setEditingId(null);
      setFormData({ title: '', content: '', image: '' });
      alert('Noticia actualizada exitosamente');
    } catch (error) {
      console.error('Error updating news:', error);
      alert('Error al actualizar la noticia');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      return;
    }

    try {
      await removeNews(id);
      alert('Noticia eliminada exitosamente');
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('Error al eliminar la noticia');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', content: '', image: '' });
  };

  if (newsLoading) {
    return <div className="loading-admin">Cargando noticias...</div>;
  }

  return (
    <div className="news-management">
      <div className="admin-header">
        <h1>Gestión de Noticias</h1>
        <button 
          className="btn-create" 
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? '✕ Cancelar' : '+ Nueva Noticia'}
        </button>
      </div>

      {showCreateForm && (
        <div className="news-form-card">
          <h2>Crear Nueva Noticia</h2>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label htmlFor="title">Título *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Título de la noticia"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Contenido *</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Contenido de la noticia"
                rows="5"
                required
              />
            </div>
            
            {/* Media Type Selector */}
            <div className="form-group">
              <label>Tipo de Contenido *</label>
              <div className="media-type-selector">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="mediaType"
                    value="image"
                    checked={formData.mediaType === 'image'}
                    onChange={handleInputChange}
                  />
                  📷 Imagen
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="mediaType"
                    value="youtube"
                    checked={formData.mediaType === 'youtube'}
                    onChange={handleInputChange}
                  />
                  🎥 Video YouTube
                </label>
              </div>
            </div>

            {formData.mediaType === 'image' ? (
              <ImageUpload
                label="Imagen de la Noticia"
                currentImage={formData.image}
                onUpload={(url) => setFormData(prev => ({ ...prev, image: url }))}
              />
            ) : (
              <div className="form-group">
                <label htmlFor="youtubeUrl">URL de YouTube *</label>
                <input
                  type="url"
                  id="youtubeUrl"
                  name="youtubeUrl"
                  value={formData.youtubeUrl}
                  onChange={handleInputChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required={formData.mediaType === 'youtube'}
                />
                <small className="form-hint">
                  Pega la URL completa del video de YouTube
                </small>
              </div>
            )}
            <div className="form-actions">
              <button type="submit" className="btn-save">Crear Noticia</button>
              <button 
                type="button" 
                className="btn-cancel" 
                onClick={() => {
                  setShowCreateForm(false);
                  setFormData({ title: '', content: '', image: '' });
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="news-list">
        {newsList.length === 0 ? (
          <p className="empty-state">No hay noticias. Crea la primera.</p>
        ) : (
          newsList.map((newsItem) => (
            <div key={newsItem.id} className="news-item-card">
              {editingId === newsItem.id ? (
                <form onSubmit={handleUpdate} className="edit-form">
                  <div className="form-group">
                    <label htmlFor={`edit-title-${newsItem.id}`}>Título *</label>
                    <input
                      type="text"
                      id={`edit-title-${newsItem.id}`}
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`edit-content-${newsItem.id}`}>Contenido *</label>
                    <textarea
                      id={`edit-content-${newsItem.id}`}
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows="5"
                      required
                    />
                  </div>
                  
                  {/* Media Type Selector */}
                  <div className="form-group">
                    <label>Tipo de Contenido *</label>
                    <div className="media-type-selector">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="mediaType"
                          value="image"
                          checked={formData.mediaType === 'image'}
                          onChange={handleInputChange}
                        />
                        📷 Imagen
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="mediaType"
                          value="youtube"
                          checked={formData.mediaType === 'youtube'}
                          onChange={handleInputChange}
                        />
                        🎥 Video YouTube
                      </label>
                    </div>
                  </div>

                  {formData.mediaType === 'image' ? (
                    <ImageUpload
                      label="Imagen de la Noticia"
                      currentImage={formData.image}
                      onUpload={(url) => setFormData(prev => ({ ...prev, image: url }))}
                    />
                  ) : (
                    <div className="form-group">
                      <label htmlFor={`edit-youtubeUrl-${newsItem.id}`}>URL de YouTube *</label>
                      <input
                        type="url"
                        id={`edit-youtubeUrl-${newsItem.id}`}
                        name="youtubeUrl"
                        value={formData.youtubeUrl}
                        onChange={handleInputChange}
                        placeholder="https://www.youtube.com/watch?v=..."
                        required={formData.mediaType === 'youtube'}
                      />
                      <small className="form-hint">
                        Pega la URL completa del video de YouTube
                      </small>
                    </div>
                  )}
                  <div className="form-actions">
                    <button type="submit" className="btn-save">Guardar</button>
                    <button type="button" className="btn-cancel" onClick={handleCancelEdit}>
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="news-item-header">
                    <div>
                      <h3>{newsItem.title}</h3>
                      <span className="news-date">{newsItem.date}</span>
                    </div>
                    <div className="news-actions">
                      <button 
                        className="btn-edit" 
                        onClick={() => handleEdit(newsItem)}
                      >
                        ✏️ Editar
                      </button>
                      <button 
                        className="btn-delete" 
                        onClick={() => handleDelete(newsItem.id)}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                  <p className="news-content">{newsItem.content}</p>
                  {newsItem.image && (
                    <div className="news-image-preview">
                      <img src={newsItem.image} alt={newsItem.title} />
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsManagement;
