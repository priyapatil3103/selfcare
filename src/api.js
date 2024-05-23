import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an axios instance with the base URL
const api = axios.create({
  // baseURL: 'http://192.168.31.242:3005/', // Replace with your actual base URL
  // baseURL: 'http://10.221.0.79:3005/',
  baseURL: 'http://localhost:3005/',
});

// Add a request interceptor to include the authorization token
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Export the configured axios instance
export default api;
