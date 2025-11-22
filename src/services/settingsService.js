const API_URL = 'http://localhost:3001';

/**
 * Settings Service
 * Handles all site settings operations (logo, footer, etc.)
 */
export const settingsService = {
  /**
   * Get site settings
   */
  getSettings: async () => {
    try {
      const response = await fetch(`${API_URL}/siteSettings`);
      if (!response.ok) throw new Error('Failed to fetch settings');
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  },

  /**
   * Update site settings
   */
  updateSettings: async (settings) => {
    try {
      const response = await fetch(`${API_URL}/siteSettings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      
      if (!response.ok) throw new Error('Failed to update settings');
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  },
};
