import { sectionsLibrary } from '../mocks/sectionsData';

/**
 * Sections Service - API calls for section library
 */

export const sectionsService = {
  /**
   * Get all section templates from library
   */
  getSectionsLibrary: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return sectionsLibrary;
  },

  /**
   * Get single section template
   */
  getSectionTemplate: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return sectionsLibrary.find((section) => section.id === id);
  },
};
