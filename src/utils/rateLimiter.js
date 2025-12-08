// Rate Limiter Utility
// Prevents spam by limiting form submissions

const RATE_LIMIT_KEY = 'contact_form_last_submit';
const RATE_LIMIT_MINUTES = 5;

/**
 * Check if user can submit the contact form
 * @returns {boolean} true if user can submit, false otherwise
 */
export const canSubmitForm = () => {
  const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
  if (!lastSubmit) return true;
  
  const timeSinceLastSubmit = Date.now() - parseInt(lastSubmit);
  const minutesSinceLastSubmit = timeSinceLastSubmit / 1000 / 60;
  
  return minutesSinceLastSubmit >= RATE_LIMIT_MINUTES;
};

/**
 * Get remaining time until user can submit again
 * @returns {number} minutes remaining, or 0 if can submit
 */
export const getRemainingTime = () => {
  const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
  if (!lastSubmit) return 0;
  
  const timeSinceLastSubmit = Date.now() - parseInt(lastSubmit);
  const minutesSinceLastSubmit = timeSinceLastSubmit / 1000 / 60;
  const remaining = RATE_LIMIT_MINUTES - minutesSinceLastSubmit;
  
  return remaining > 0 ? Math.ceil(remaining) : 0;
};

/**
 * Record that user submitted the form
 */
export const recordFormSubmit = () => {
  localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
};

/**
 * Clear rate limit (for testing or admin override)
 */
export const clearRateLimit = () => {
  localStorage.removeItem(RATE_LIMIT_KEY);
};
