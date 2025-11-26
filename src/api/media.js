import apiClient from './client';

export const mediaApi = {
  getPublicMedia: (id) => apiClient.get(`/Media/public/${id}`),
  uploadMedia: (formData) => apiClient.post('/Media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  uploadMultipleMedia: (formData) => apiClient.post('/Media/upload-multiple', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getMediaLibrary: (params) => apiClient.get('/Media', { params }),
  updateMedia: (data) => apiClient.put('/Media', data),
  getMedia: (id) => apiClient.get(`/Media/${id}`),
  deleteMedia: (id) => apiClient.delete(`/Media/${id}`),
  deleteBulkMedia: (ids) => apiClient.delete('/Media/bulk', { data: ids }),
  searchMedia: (params) => apiClient.get('/Media/search', { params }),
  reorderMedia: (ids) => apiClient.post('/Media/reorder', ids),
};
