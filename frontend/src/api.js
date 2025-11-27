// Centralized API base URL for the frontend
// Uses environment variable when provided, otherwise falls back to localhost:3000
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';


