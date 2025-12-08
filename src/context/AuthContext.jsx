import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../config/firebase';

// Create Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);

  // Check if user is admin by querying Firestore
  const checkAdminStatus = async (currentUser) => {
    if (!currentUser || !currentUser.email) {
      setIsAdminUser(false);
      return false;
    }

    try {
      const adminDocRef = doc(db, 'admins', currentUser.email.toLowerCase());
      const adminDoc = await getDoc(adminDocRef);
      
      const isAdmin = adminDoc.exists() && adminDoc.data().active === true;
      setIsAdminUser(isAdmin);
      return isAdmin;
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdminUser(false);
      return false;
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        await checkAdminStatus(currentUser);
      } else {
        setIsAdminUser(false);
      }
      
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      await checkAdminStatus(result.user);
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError(error.message);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setIsAdminUser(false);
    } catch (error) {
      console.error('Error signing out:', error);
      setError(error.message);
      throw error;
    }
  };

  // Check if user is admin (returns cached value)
  const isAdmin = () => {
    return isAdminUser;
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    loginWithGoogle,
    logout,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
