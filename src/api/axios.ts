import axios from 'axios';
export const api = axios.create({ baseURL: '/gPanel' });

// Request Interceptor: Automatically adds the Basic Auth header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth');
  if (token) {
    config.headers.Authorization = `Basic ${token}`;
  }
  return config;
});

// Optional Response Interceptor: Handles 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth'); // Clear stale credentials
      window.location.href = '/login'; // Force redirect to login
    }
    return Promise.reject(error);
  }
);
