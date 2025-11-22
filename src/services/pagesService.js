import api from './api';

/**
 * Pages Service - API calls for pages management
 */

export const pagesService = {
  /**
   * Get all pages
   */
  getPages: async () => {
    return api.get('/pages');
  },

  /**
   * Get single page by ID
   */
  getPage: async (id) => {
    return api.get(`/pages/${id}`);
  },

  /**
   * Create new page
   */
  createPage: async (data) => {
    return api.post('/pages', data);
  },

  /**
   * Update existing page
   */
  updatePage: async (id, data) => {
    return api.put(`/pages/${id}`, data);
  },

  /**
   * Delete page
   */
  deletePage: async (id) => {
    return api.delete(`/pages/${id}`);
  },

  /**
   * Update page sections
   */
  updatePageSections: async (id, sections) => {
    return api.patch(`/pages/${id}`, { sections });
  },
};
