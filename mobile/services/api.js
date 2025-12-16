import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANT: Replace with your machine's local IP address
// Find your IP:
// - Windows: Open CMD and run 'ipconfig', look for IPv4 Address
// - Mac/Linux: Open Terminal and run 'ifconfig' or 'ip addr', look for inet
// Example: 'http://192.168.1.100:3001'
const BASE_URL = 'http://192.168.1.X:3001';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) =>
    api.post('/api/auth/login', { email, password }),

  register: (userData) =>
    api.post('/api/auth/register', userData),

  getMe: () =>
    api.get('/api/auth/me'),
};

export const bloodBankAPI = {
  getAll: () =>
    api.get('/api/auth/blood-banks'),

  getById: (id) =>
    api.get(`/api/auth/blood-banks/${id}`),
};

export const donationAPI = {
  getHistory: () =>
    api.get('/api/donations/history'),

  create: (data) =>
    api.post('/api/donations', data),
};

export default api;
