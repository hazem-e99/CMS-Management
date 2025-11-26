import apiClient from './client';

export const authApi = {
  login: (data) => apiClient.post('/Authentication/Login', data),
  verify: (data) => apiClient.post('/Authentication/Verification', data),
  forgotPassword: (data) => apiClient.post('/Authentication/Forgot-Password', data),
  register: (data) => apiClient.post('/Authentication/Registration', data),
  resetPassword: (data) => apiClient.post('/Authentication/Reset-Password', data),
  changePassword: (data) => apiClient.post('/Authentication/Change-Password', data),
};
