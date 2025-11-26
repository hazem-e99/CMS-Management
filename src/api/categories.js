import apiClient from './client';

export const categoriesApi = {
  getNavbarCategories: () => apiClient.get('/Categories/navbar'),
  getPublicCategory: (id) => apiClient.get(`/Categories/public/${id}`),
  createCategory: (data) => apiClient.post('/Categories', data),
  getCategories: (params) => apiClient.get('/Categories', { params }),
  updateCategory: (data) => apiClient.put('/Categories', data),
  getCategory: (id, params) => apiClient.get(`/Categories/${id}`, { params }),
  deleteCategory: (id) => apiClient.delete(`/Categories/${id}`),
  getCategoryByName: (name, params) => apiClient.get(`/Categories/name/${name}`, { params }),
  searchCategories: (searchTerm) => apiClient.get('/Categories/search', { params: { searchTerm } }),
  reorderCategories: (ids) => apiClient.post('/Categories/reorder', ids),
};
