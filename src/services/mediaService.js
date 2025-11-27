import { API_CONFIG } from '../api/config';

const API_URL = API_CONFIG.baseURL;

export const mediaService = {
  /**
   * Upload a single file
   * @param {File} file - The file to upload
   * @param {string} alternateText - Optional alt text
   * @param {string} caption - Optional caption
   * @returns {Promise<Object>} - The uploaded media object
   */
  uploadMedia: async (file, alternateText = '', caption = '') => {
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const formData = new FormData();
      formData.append('File', file);
      if (alternateText) formData.append('AlternateText', alternateText);
      if (caption) formData.append('Caption', caption);

      const response = await fetch(`${API_URL}/Media/upload`, {
        method: 'POST',
        headers: headers,
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload media');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error uploading media:', error);
      throw error;
    }
  },
};
