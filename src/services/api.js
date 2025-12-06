import { db } from '../config/firebase';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

// Collection references
const NEWS_COLLECTION = 'news';
const HERO_DOC_ID = 'main';
const HERO_COLLECTION = 'hero';
const COURSES_COLLECTION = 'courses';

// ============= NEWS API =============

/**
 * Get all news items, ordered by creation date (newest first)
 */
export const getNews = async () => {
  try {
    const newsRef = collection(db, NEWS_COLLECTION);
    const q = query(newsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert Firestore timestamps to readable dates
      date: doc.data().date || new Date().toISOString().split('T')[0],
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
    }));
  } catch (error) {
    console.error('Error getting news:', error);
    throw new Error('Failed to fetch news');
  }
};

/**
 * Get a single news item by ID
 */
export const getNewsById = async (id) => {
  try {
    const newsDoc = doc(db, NEWS_COLLECTION, id);
    const snapshot = await getDoc(newsDoc);
    
    if (!snapshot.exists()) {
      throw new Error('News item not found');
    }
    
    return {
      id: snapshot.id,
      ...snapshot.data(),
      date: snapshot.data().date || new Date().toISOString().split('T')[0],
      createdAt: snapshot.data().createdAt?.toDate?.() || new Date(),
      updatedAt: snapshot.data().updatedAt?.toDate?.() || new Date(),
    };
  } catch (error) {
    console.error('Error getting news by ID:', error);
    throw error;
  }
};

/**
 * Create a new news item
 */
export const createNews = async (newsItem) => {
  try {
    const newsRef = collection(db, NEWS_COLLECTION);
    const newItem = {
      title: newsItem.title,
      content: newsItem.content,
      image: newsItem.image || '',
      date: new Date().toISOString().split('T')[0],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(newsRef, newItem);
    
    return {
      id: docRef.id,
      ...newItem,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error('Error creating news:', error);
    throw new Error('Failed to create news');
  }
};

/**
 * Update an existing news item
 */
export const updateNews = async (id, updatedData) => {
  try {
    const newsDoc = doc(db, NEWS_COLLECTION, id);
    
    // Check if document exists
    const snapshot = await getDoc(newsDoc);
    if (!snapshot.exists()) {
      throw new Error('News item not found');
    }
    
    const updatePayload = {
      ...updatedData,
      updatedAt: serverTimestamp(),
    };
    
    await updateDoc(newsDoc, updatePayload);
    
    return {
      id,
      ...snapshot.data(),
      ...updatedData,
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error('Error updating news:', error);
    throw error;
  }
};

/**
 * Delete a news item
 */
export const deleteNews = async (id) => {
  try {
    const newsDoc = doc(db, NEWS_COLLECTION, id);
    await deleteDoc(newsDoc);
    return { success: true };
  } catch (error) {
    console.error('Error deleting news:', error);
    throw new Error('Failed to delete news');
  }
};

// ============= HERO API =============

/**
 * Get hero section data
 */
export const getHero = async () => {
  try {
    const heroDoc = doc(db, HERO_COLLECTION, HERO_DOC_ID);
    const snapshot = await getDoc(heroDoc);
    
    if (!snapshot.exists()) {
      // Return default hero if doesn't exist
      return {
        title: 'Pablo Traberzo',
        subtitle: 'Guitarrista & Compositor',
        backgroundImage: '',
      };
    }
    
    return {
      ...snapshot.data(),
      updatedAt: snapshot.data().updatedAt?.toDate?.() || new Date(),
    };
  } catch (error) {
    console.error('Error getting hero:', error);
    // Return default on error
    return {
      title: 'Pablo Traberzo',
      subtitle: 'Guitarrista & Compositor',
      backgroundImage: '',
    };
  }
};

/**
 * Update hero section data
 */
export const updateHero = async (heroData) => {
  try {
    const heroDoc = doc(db, HERO_COLLECTION, HERO_DOC_ID);
    
    const updatePayload = {
      title: heroData.title,
      subtitle: heroData.subtitle,
      backgroundImage: heroData.backgroundImage || '',
      updatedAt: serverTimestamp(),
    };
    
    // Use setDoc with merge to create or update
    await setDoc(heroDoc, updatePayload, { merge: true });
    
    return {
      ...updatePayload,
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error('Error updating hero:', error);
    throw new Error('Failed to update hero');
  }
};

// ============= COURSES API =============

/**
 * Get all courses, ordered by creation date (newest first)
 */
export const getCourses = async () => {
  try {
    const coursesRef = collection(db, COURSES_COLLECTION);
    const q = query(coursesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
    }));
  } catch (error) {
    console.error('Error getting courses:', error);
    throw new Error('Failed to fetch courses');
  }
};

/**
 * Create a new course
 */
export const createCourse = async (courseData) => {
  try {
    const coursesRef = collection(db, COURSES_COLLECTION);
    const newCourse = {
      title: courseData.title,
      description: courseData.description,
      image: courseData.image || '',
      price: courseData.price,
      level: courseData.level || 'Principiante',
      duration: courseData.duration || '',
      lessons: courseData.lessons || '',
      gumroadUrl: courseData.gumroadUrl || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(coursesRef, newCourse);
    
    return {
      id: docRef.id,
      ...newCourse,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error('Error creating course:', error);
    throw new Error('Failed to create course');
  }
};

/**
 * Update an existing course
 */
export const updateCourse = async (id, courseData) => {
  try {
    const courseDoc = doc(db, COURSES_COLLECTION, id);
    const updatePayload = {
      title: courseData.title,
      description: courseData.description,
      image: courseData.image || '',
      price: courseData.price,
      level: courseData.level || 'Principiante',
      duration: courseData.duration || '',
      lessons: courseData.lessons || '',
      gumroadUrl: courseData.gumroadUrl || '',
      updatedAt: serverTimestamp(),
    };
    
    await updateDoc(courseDoc, updatePayload);
    
    return {
      id,
      ...updatePayload,
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error('Error updating course:', error);
    throw new Error('Failed to update course');
  }
};

/**
 * Delete a course
 */
export const deleteCourse = async (id) => {
  try {
    const courseDoc = doc(db, COURSES_COLLECTION, id);
    await deleteDoc(courseDoc);
    return { id };
  } catch (error) {
    console.error('Error deleting course:', error);
    throw new Error('Failed to delete course');
  }
};
