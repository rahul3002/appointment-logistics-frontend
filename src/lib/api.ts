import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

// Partners API
export const partnersAPI = {
  getAll: () => api.get('/partners'),
  getById: (id) => api.get(`/partners/${id}`),
  create: (partnerData) => api.post('/partners', partnerData),
  update: (id, partnerData) => api.put(`/partners/${id}`, partnerData),
  delete: (id) => api.delete(`/partners/${id}`),
};

// Hubs API
export const hubsAPI = {
  getAll: () => api.get('/hubs'),
  getById: (id) => api.get(`/hubs/${id}`),
  create: (hubData) => api.post('/hubs', hubData),
  update: (id, hubData) => api.put(`/hubs/${id}`, hubData),
  delete: (id) => api.delete(`/hubs/${id}`),
};

// Slots API
export const slotsAPI = {
  getAll: () => api.get('/slots'),
  getById: (id) => api.get(`/slots/${id}`),
  create: (slotData) => api.post('/slots', slotData),
  update: (id, slotData) => api.put(`/slots/${id}`, slotData),
  delete: (id) => api.delete(`/slots/${id}`),
};

// Appointments API
export const appointmentsAPI = {
  getAll: () => api.get('/appointments'),
  getById: (id) => api.get(`/appointments/${id}`),
  create: (appointmentData) => api.post('/appointments', appointmentData),
  update: (id, appointmentData) => api.put(`/appointments/${id}`, appointmentData),
  delete: (id) => api.delete(`/appointments/${id}`),
};

export default api;
