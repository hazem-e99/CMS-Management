import { API_CONFIG } from '../api/config';

const API_URL = API_CONFIG.baseURL;

/**
 * Settings Service
 * Handles all site settings operations using the new API endpoints
 */
export const settingsService = {
  /**
   * Get all site settings
   * We'll fetch all settings and map them to a usable object
   */
  getSettings: async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Fetch all settings (using search with empty term to get all settings)
      const response = await fetch(`${API_URL}/Settings/search?searchTerm=`, {
        headers: headers,
        cache: 'no-store' // Prevent browser caching
      });
      
      if (!response.ok) {
        if (response.status === 401) {
            console.error('Unauthorized: Please login to access settings');
            throw new Error('Unauthorized');
        }
        // Fallback for development/mock if API fails
        console.warn('Failed to fetch settings from API, returning empty object');
        return { data: {} };
      }
      
      const result = await response.json();
      const settingsList = result.data || [];
      
      console.log('Settings loaded from API:', settingsList);
      
      // Convert list of { key, value } to a single object
      const settingsObject = settingsList.reduce((acc, item) => {
        try {
          // Try to parse value as JSON, otherwise keep as string
          acc[item.key] = JSON.parse(item.value);
        } catch (e) {
          acc[item.key] = item.value;
        }
        // Also store the ID for updates
        acc[`${item.key}_id`] = item.id;
        return acc;
      }, {});

      console.log('Settings object:', settingsObject);
      return { data: settingsObject };
    } catch (error) {
      console.error('Error fetching settings:', error);
      // Return empty object on error to prevent crashes
      return { data: {} };
    }
  },

  /**
   * Update site settings
   * @param {Object} settings - Object containing key-value pairs to update
   */
  updateSettings: async (settings) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Separate updates (existing IDs) and creates (new settings)
      const updates = [];
      const creates = [];

      Object.keys(settings).filter(key => !key.endsWith('_id')).forEach(key => {
        const id = settings[`${key}_id`];
        const value = typeof settings[key] === 'object' ? JSON.stringify(settings[key]) : settings[key];
        
        const dto = {
          key: key,
          value: value,
          category: 'general',
          dataType: 'json',
          isPublic: true
        };

        if (id) {
          updates.push({ ...dto, id: id });
        } else {
          creates.push(dto);
        }
      });

      const promises = [];

      // 1. Bulk Update for existing settings
      if (updates.length > 0) {
        promises.push(
          fetch(`${API_URL}/Settings/bulk`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(updates),
          }).then(res => {
            if (!res.ok) throw new Error('Failed to update settings');
            return res.json();
          })
        );
      }

      // 2. Individual Create for new settings
      if (creates.length > 0) {
        creates.forEach(createDto => {
          promises.push(
            fetch(`${API_URL}/Settings`, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(createDto),
            }).then(res => {
              if (!res.ok) throw new Error('Failed to create setting: ' + createDto.key);
              return res.json();
            })
          );
        });
      }

      await Promise.all(promises);
      
      return { success: true };
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  },
};
