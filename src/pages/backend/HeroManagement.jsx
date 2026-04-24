import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ImageUpload from '../../components/ImageUpload';
import './HeroManagement.css';

const HeroManagement = () => {
  const { heroData, heroLoading, saveHero, refreshHero } = useApp();
  const [saving, setSaving] = useState(false);
  const [localHeroData, setLocalHeroData] = useState(heroData);

  // Update local state when context hero data changes
  React.useEffect(() => {
    setLocalHeroData(heroData);
  }, [heroData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalHeroData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!localHeroData.title || !localHeroData.subtitle) {
      alert('Por favor completa el título y subtítulo');
      return;
    }

    try {
      setSaving(true);
      await saveHero(localHeroData);
      alert('Hero actualizado exitosamente');
    } catch (error) {
      console.error('Error updating hero:', error);
      alert('Error al actualizar el hero');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setLocalHeroData(heroData);
  };

  if (heroLoading) {
    return <div className="loading-admin">Cargando datos del hero...</div>;
  }

  return (
    <div className="hero-management">
      <div className="admin-header">
        <h1>Gestión del Hero</h1>
      </div>

      <div className="hero-preview-section">
        <h2>Vista Previa</h2>
        <div 
          className="hero-preview" 
          style={{ 
            backgroundImage: localHeroData.backgroundImage 
               ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${localHeroData.backgroundImage})`
               : 'var(--bg-tertiary)'
           }}
        >
          <h1>{localHeroData.title || 'Título del Hero'}</h1>
          <p>{localHeroData.subtitle || 'Subtítulo del Hero'}</p>
        </div>
      </div>

      <div className="admin-form-card">
        <h2>Editar Hero</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={localHeroData.title}
              onChange={handleInputChange}
              placeholder="Pablo Traberzo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subtitle">Subtítulo *</label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={localHeroData.subtitle}
              onChange={handleInputChange}
              placeholder="Guitarrista & Compositor"
              required
            />
          </div>

          <ImageUpload
            label="Imagen de Fondo del Hero"
            currentImage={localHeroData.backgroundImage}
            onUpload={(url) => setLocalHeroData(prev => ({ ...prev, backgroundImage: url }))}
          />
          <small className="form-hint">
            Recomendado: imagen de alta resolución (1920x1080 o superior)
          </small>

          <div className="form-actions">
             <button 
               type="submit" 
               className="btn-save" 
               disabled={saving}
             >
               {saving ? 'Guardando...' : 'Guardar Cambios'}
             </button>
             <button 
               type="button" 
               className="btn-reset" 
               onClick={handleReset}
             >
               Restablecer
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroManagement;
