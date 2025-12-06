import React, { createContext, useContext, useState, useEffect } from 'react';
import { getNews, createNews, updateNews, deleteNews, getHero, updateHero, getCourses, createCourse, updateCourse, deleteCourse } from '../services/api';
import emailjs from '@emailjs/browser';
import emailConfig from '../config/emailConfig';

// Create Context
const AppContext = createContext();

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Provider Component
export const AppProvider = ({ children }) => {
  // News State
  const [newsList, setNewsList] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(null);

  // Hero State
  const [heroData, setHeroData] = useState({
    title: 'Pablo Traberzo',
    subtitle: 'Guitarrista & Compositor',
    backgroundImage: '',
  });
  const [heroLoading, setHeroLoading] = useState(true);
  const [heroError, setHeroError] = useState(null);

  // Contact State
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState(null);

  // Courses State
  const [coursesList, setCoursesList] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState(null);

  // Load initial data
  useEffect(() => {
    loadNews();
    loadHero();
    loadCourses();
  }, []);

  // ============= NEWS FUNCTIONS =============

  const loadNews = async () => {
    try {
      setNewsLoading(true);
      setNewsError(null);
      const data = await getNews();
      setNewsList(data);
    } catch (error) {
      console.error('Error loading news:', error);
      setNewsError('Error al cargar las noticias');
    } finally {
      setNewsLoading(false);
    }
  };

  const addNews = async (newsItem) => {
    try {
      const newItem = await createNews(newsItem);
      setNewsList(prev => [newItem, ...prev]);
      return newItem;
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  };

  const editNews = async (id, updatedData) => {
    try {
      const updated = await updateNews(id, updatedData);
      setNewsList(prev => 
        prev.map(item => item.id === id ? updated : item)
      );
      return updated;
    } catch (error) {
      console.error('Error updating news:', error);
      throw error;
    }
  };

  const removeNews = async (id) => {
    try {
      await deleteNews(id);
      setNewsList(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting news:', error);
      throw error;
    }
  };

  const refreshNews = async () => {
    await loadNews();
  };

  // ============= HERO FUNCTIONS =============

  const loadHero = async () => {
    try {
      setHeroLoading(true);
      setHeroError(null);
      const data = await getHero();
      setHeroData(data);
    } catch (error) {
      console.error('Error loading hero:', error);
      setHeroError('Error al cargar el hero');
    } finally {
      setHeroLoading(false);
    }
  };

  const saveHero = async (newHeroData) => {
    try {
      const updated = await updateHero(newHeroData);
      setHeroData(updated);
      return updated;
    } catch (error) {
      console.error('Error updating hero:', error);
      throw error;
    }
  };

  const refreshHero = async () => {
    await loadHero();
  };

  // ============= CONTACT FUNCTIONS =============

  const sendContactEmail = async (formData) => {
    try {
      setContactLoading(true);
      setContactError(null);
      setContactSuccess(false);

      // Prepare template params for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      // Send email using EmailJS
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams,
        emailConfig.publicKey
      );

      setContactSuccess(true);
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      setContactError('Error al enviar el mensaje. Por favor, intenta nuevamente.');
      throw error;
    } finally {
      setContactLoading(false);
    }
  };

  const clearContactStatus = () => {
    setContactSuccess(false);
    setContactError(null);
  };

  // ============= COURSES FUNCTIONS =============

  const loadCourses = async () => {
    try {
      setCoursesLoading(true);
      setCoursesError(null);
      const courses = await getCourses();
      setCoursesList(courses);
    } catch (error) {
      console.error('Failed to load courses:', error);
      setCoursesError(error.message);
    } finally {
      setCoursesLoading(false);
    }
  };

  const addCourse = async (courseData) => {
    try {
      const newCourse = await createCourse(courseData);
      setCoursesList(prev => [newCourse, ...prev]);
      return newCourse;
    } catch (error) {
      console.error('Failed to add course:', error);
      throw error;
    }
  };

  const editCourse = async (id, courseData) => {
    try {
      const updatedCourse = await updateCourse(id, courseData);
      setCoursesList(prev =>
        prev.map(course => (course.id === id ? { ...course, ...updatedCourse } : course))
      );
      return updatedCourse;
    } catch (error) {
      console.error('Failed to update course:', error);
      throw error;
    }
  };

  const removeCourse = async (id) => {
    try {
      await deleteCourse(id);
      setCoursesList(prev => prev.filter(course => course.id !== id));
    } catch (error) {
      console.error('Failed to delete course:', error);
      throw error;
    }
  };

  const refreshCourses = () => {
    loadCourses();
  };

  // Context value
  const value = {
    // News
    newsList,
    newsLoading,
    newsError,
    addNews,
    editNews,
    removeNews,
    refreshNews,
    
    // Hero
    heroData,
    heroLoading,
    heroError,
    saveHero,
    refreshHero,

    // Contact
    contactLoading,
    contactSuccess,
    contactError,
    sendContactEmail,
    clearContactStatus,

    // Courses
    coursesList,
    coursesLoading,
    coursesError,
    addCourse,
    editCourse,
    removeCourse,
    refreshCourses,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
