import apiClient from './client';

export const pagesApi = {
  getPublicPageBySlug: (slug) => apiClient.get(`/Pages/public/${slug}`),
  getPublicPageById: (id) => apiClient.get(`/Pages/public/id/${id}`),
  getPublicHomepage: () => apiClient.get('/Pages/public/homepage'),
  getPublicPagesByCategory: (categoryId) => apiClient.get(`/Pages/public/category/${categoryId}`),
  createPage: (data) => apiClient.post('/Pages', data),
  createPageWithComponents: (data) => apiClient.post('/Pages/with-components', data),
  getPages: (params) => apiClient.get('/Pages', { params }),
  updatePage: (data) => apiClient.put('/Pages', data),
  getPage: (id, params) => apiClient.get(`/Pages/${id}`, { params }),
  deletePage: (id) => apiClient.delete(`/Pages/${id}`),
  createPageComponent: (pageId, data) => apiClient.post(`/Pages/${pageId}/components`, data),
  updatePageComponent: (componentId, data) => apiClient.put(`/Pages/components/${componentId}`, data),
  deletePageComponent: (componentId) => apiClient.delete(`/Pages/components/${componentId}`),
};
