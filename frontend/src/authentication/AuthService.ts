import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password
  });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

///////// AXIOS INTERCEPTER

axios.interceptors.request.use(config => {
  const user = getCurrentUser();
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});