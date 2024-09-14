import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchTasks = async ({ status = 'all', search = '', page = 1 }) => {
  const response = await axiosInstance.get('/tasks/', {
    params: { status, search, page },
  });
  return response.data;
};

export const fetchTask = async (id) => {
  const response = await axiosInstance.get(`/tasks/${id}/`);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axiosInstance.post('/tasks/', taskData);
  return response.data;
};

export const updateTask = async (taskData) => {
  const response = await axiosInstance.put(`/tasks/${taskData.id}/`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  await axiosInstance.delete(`/tasks/${id}/`);
};

export const updateTaskStatus = async (id, status) => {
  const response = await axiosInstance.patch(`/tasks/${id}/`, { status });
  return response.data;
};