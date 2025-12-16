import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from './api';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      const { token, user } = response.data;

      if (user.role !== 'DONOR') {
        throw new Error('Only donors can access the mobile app');
      }

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await authAPI.register({
        ...userData,
        role: 'DONOR',
      });
      const { token, user } = response.data;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } catch (error) {
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      return null;
    }
  },

  getToken: async () => {
    try {
      return await AsyncStorage.getItem('token');
    } catch (error) {
      return null;
    }
  },

  isAuthenticated: async () => {
    const token = await authService.getToken();
    return !!token;
  },
};
