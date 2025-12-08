// Input Sanitization Utility
// Prevents XSS attacks by cleaning user input

import DOMPurify from 'dompurify';

/**
 * Sanitize plain text input (removes all HTML)
 * Use for: names, emails, plain text fields
 * @param {string} input - Raw user input
 * @returns {string} Sanitized text
 */
export const sanitizeInput = (input) => {
  if (!input || typeof input !== 'string') return '';
  
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true // Keep text content, remove tags
  }).trim();
};

/**
 * Sanitize HTML content (allows safe HTML tags)
 * Use for: rich text editors, formatted content
 * @param {string} html - Raw HTML input
 * @returns {string} Sanitized HTML
 */
export const sanitizeHTML = (html) => {
  if (!html || typeof html !== 'string') return '';
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false
  });
};

/**
 * Sanitize URL (ensures it's a valid, safe URL)
 * Use for: image URLs, external links
 * @param {string} url - Raw URL input
 * @returns {string} Sanitized URL or empty string if invalid
 */
export const sanitizeURL = (url) => {
  if (!url || typeof url !== 'string') return '';
  
  try {
    const sanitized = DOMPurify.sanitize(url, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: []
    }).trim();
    
    // Validate URL format
    const urlObj = new URL(sanitized);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return '';
    }
    
    return sanitized;
  } catch (error) {
    // Invalid URL
    return '';
  }
};

/**
 * Sanitize email (basic validation and sanitization)
 * @param {string} email - Raw email input
 * @returns {string} Sanitized email or empty string if invalid
 */
export const sanitizeEmail = (email) => {
  if (!email || typeof email !== 'string') return '';
  
  const sanitized = sanitizeInput(email).toLowerCase();
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(sanitized) ? sanitized : '';
};

/**
 * Validate and sanitize form data
 * @param {Object} formData - Raw form data
 * @returns {Object} Sanitized form data
 */
export const sanitizeFormData = (formData) => {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};
