export const API_URLS = {
  VTON: '/api/vton',
  VTON_STATUS: '/api/vton/status',
  // Add other API endpoints here as needed
};

export const API_CONFIG = {
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
} as const;

export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  TIMEOUT: 'Request timed out. Please try again.',
  INVALID_REQUEST: 'Invalid request parameters.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  UNAUTHORIZED: 'Unauthorized access. Please login again.',
  FORBIDDEN: 'Access forbidden. Please check your permissions.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Validation error occurred.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
}; 