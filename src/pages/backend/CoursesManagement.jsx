import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ImageUpload from '../../components/ImageUpload';
import './CoursesManagement.css';

const CoursesManagement = () => {
  const { coursesList, coursesLoading, addCourse, editCourse, removeCourse } = useApp();
  const [editingId, setEditingId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    level: 'Principiante',
    duration: '',
    lessons: '',
    gumroadUrl: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.price) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    try {
      await addCourse(formData);
      setFormData({
        title: '',
        description: '',
        image: '',
        price: '',
        level: 'Principiante',
        duration: '',
        lessons: '',
        gumroadUrl: '',
      });
      setShowCreateForm(false);
      alert('Curso creado exitosamente');
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Error al crear el curso');
    }
  };

  const handleEdit = (course) => {
    setEditingId(course.id);
    setFormData({
      title: course.title,
      description: course.description,
      image: course.image || '',
      price: course.price,
      level: course.level || 'Principiante',
      duration: course.duration || '',
      lessons: course.lessons || '',
      gumroadUrl: course.gumroadUrl || '',
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.price) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    try {
      await editCourse(editingId, formData);
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        price: '',
        level: 'Principiante',
        duration: '',
        lessons: '',
        gumroadUrl: '',
      });
      alert('Curso actualizado exitosamente');
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Error al actualizar el curso');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      price: '',
      level: 'Principiante',
      duration: '',
      lessons: '',
      gumroadUrl: '',
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      try {
        await removeCourse(id);
        alert('Curso eliminado exitosamente');
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Error al eliminar el curso');
      }
    }
  };

  if (coursesLoading) {
    return <div className="loading-admin">Cargando cursos...</div>;
  }

  return (
    <div className="courses-management">
      <div className="admin-header">
        <h1>Gestión de Cursos</h1>
        <button
          className="btn-create"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? '✕ Cancelar' : '+ Nuevo Curso'}
        </button>
      </div>

      {showCreateForm && (
        <div className="course-form-card">
          <h2>Crear Nuevo Curso</h2>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label htmlFor="title">Título *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Título del curso"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descripción del curso"
                rows="4"
                required
              />
            </div>

            <ImageUpload
              label="Imagen del Curso"
              currentImage={formData.image}
              onUpload={(url) => setFormData(prev => ({ ...prev, image: url }))}
            />

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Precio *</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="$49"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="level">Nivel *</label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="duration">Duración</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="8 semanas"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lessons">Lecciones</label>
                <input
                  type="text"
                  id="lessons"
                  name="lessons"
                  value={formData.lessons}
                  onChange={handleInputChange}
                  placeholder="24 lecciones"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="gumroadUrl">URL de Gumroad</label>
              <input
                type="url"
                id="gumroadUrl"
                name="gumroadUrl"
                value={formData.gumroadUrl}
                onChange={handleInputChange}
                placeholder="https://gumroad.com/l/tu-curso"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">Crear Curso</button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowCreateForm(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="courses-list">
        {coursesList.length === 0 ? (
          <p className="empty-state">No hay cursos. Crea el primero.</p>
        ) : (
          coursesList.map((course) => (
            <div key={course.id} className="course-item-card">
              {editingId === course.id ? (
                <form onSubmit={handleUpdate} className="edit-form">
                  <div className="form-group">
                    <label htmlFor={`edit-title-${course.id}`}>Título *</label>
                    <input
                      type="text"
                      id={`edit-title-${course.id}`}
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`edit-description-${course.id}`}>Descripción *</label>
                    <textarea
                      id={`edit-description-${course.id}`}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      required
                    />
                  </div>

                  <ImageUpload
                    label="Imagen del Curso"
                    currentImage={formData.image}
                    onUpload={(url) => setFormData(prev => ({ ...prev, image: url }))}
                  />

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor={`edit-price-${course.id}`}>Precio *</label>
                      <input
                        type="text"
                        id={`edit-price-${course.id}`}
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor={`edit-level-${course.id}`}>Nivel *</label>
                      <select
                        id={`edit-level-${course.id}`}
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor={`edit-duration-${course.id}`}>Duración</label>
                      <input
                        type="text"
                        id={`edit-duration-${course.id}`}
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor={`edit-lessons-${course.id}`}>Lecciones</label>
                      <input
                        type="text"
                        id={`edit-lessons-${course.id}`}
                        name="lessons"
                        value={formData.lessons}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor={`edit-gumroadUrl-${course.id}`}>URL de Gumroad</label>
                    <input
                      type="url"
                      id={`edit-gumroadUrl-${course.id}`}
                      name="gumroadUrl"
                      value={formData.gumroadUrl}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-save">Guardar</button>
                    <button type="button" className="btn-cancel" onClick={handleCancelEdit}>
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="course-item-header">
                    <div>
                      <h3>{course.title}</h3>
                      <span className="course-meta-text">
                        {course.level} • {course.price} • {course.duration}
                      </span>
                    </div>
                    <div className="course-actions">
                      <button className="btn-edit" onClick={() => handleEdit(course)}>
                        Editar
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(course.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <p className="course-content">{course.description}</p>
                  {course.image && (
                    <div className="course-image-preview">
                      <img src={course.image} alt={course.title} />
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

export default CoursesManagement;
