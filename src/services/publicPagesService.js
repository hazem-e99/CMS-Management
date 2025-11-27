import { pagesApi } from '../api/pages';
import { siteSettings } from '../mocks/siteSettings';

/**
 * Service for public pages - uses pagesApi internally
 */
export const publicPagesService = {
  /**
   * Get all published pages
   */
  getPublicPages: async () => {
    const response = await pagesApi.getPages({ publishedOnly: true });
    return response.data || response;
  },

  /**
   * Get page by slug
   */
  getPageBySlug: async (slug) => {
    const response = await pagesApi.getPublicPageBySlug(slug);
    return response.data || response;
  },

  /**
   * Get homepage
   */
  getHomepage: async () => {
    const response = await pagesApi.getPublicHomepage();
    return response.data || response;
  },

  /**
   * Get child pages of a parent (category)
   */
  getChildPages: async (parentId) => {
    const response = await pagesApi.getPublicPagesByCategory(parentId);
    return response.data || response;
  },

  /**
   * Get site settings
   */
  getSiteSettings: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(siteSettings);
      }, 50);
    });
  },

  /**
   * Get navigation menu structure
   */
  getNavigationMenu: async () => {
    try {
      const { categoriesApi } = await import('../api/categories');
      const response = await categoriesApi.getNavbarCategories();
      return response.data || response;
    } catch (error) {
      console.error('Error fetching navigation menu:', error);
      return [];
    }
  },
};
