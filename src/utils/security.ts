/**
 * Security utility functions for input validation and sanitization
 */

// HTML entity encoding to prevent XSS
export const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
  };
  
  return text.replace(/[&<>"'/]/g, (s) => map[s]);
};

// Remove potentially dangerous characters
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length
};

// Basic email validation (additional to Zod validation)
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 100;
};

// Rate limiting helper
export const checkRateLimit = (key: string, limitMs: number = 60000): boolean => {
  const lastAction = localStorage.getItem(key);
  if (!lastAction) return true;
  
  const timeDiff = Date.now() - parseInt(lastAction);
  return timeDiff >= limitMs;
};

// Set rate limit timestamp
export const setRateLimit = (key: string): void => {
  localStorage.setItem(key, Date.now().toString());
};

// Validate URL for external links
export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// Content Security Policy helper
export const createSecureLink = (href: string): { href: string; rel: string; target?: string } => {
  if (href.startsWith('mailto:') || href.startsWith('tel:')) {
    return { href, rel: 'noopener' };
  }
  
  if (href.startsWith('http') && !href.includes('ditems.fr')) {
    return { 
      href, 
      rel: 'noopener noreferrer', 
      target: '_blank' 
    };
  }
  
  return { href, rel: 'noopener' };
};