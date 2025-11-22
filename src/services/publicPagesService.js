import { pagesService } from './pagesService';
import { siteSettings } from '../mocks/siteSettings';

/**
 * Service for public pages - uses pagesService internally
 */
export const publicPagesService = {
  /**
   * Get all published pages
   */
  getPublicPages: async () => {
    const response = await pagesService.getPages();
    const pages = response.data;
    return pages.filter((page) => page.metadata.isPublished);
  },

  /**
   * Get page by slug
   */
  getPageBySlug: async (slug) => {
    const response = await pagesService.getPages();
    const pages = response.data;
    const page = pages.find(
      (p) => p.slug === slug && p.metadata.isPublished
    );
    if (page) {
      return page;
    } else {
      throw new Error('Page not found');
    }
  },

  /**
   * Get child pages of a parent
   */
  getChildPages: async (parentId) => {
    const response = await pagesService.getPages();
    const pages = response.data;
    const children = pages.filter(
      (p) => p.parentId === parentId && p.metadata.isPublished
    );
    return children.sort((a, b) => a.metadata.order - b.metadata.order);
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
    const response = await pagesService.getPages();
    const pages = response.data;
    const topLevelPages = pages.filter(
      (p) => !p.parentId && p.metadata.showInNav && p.metadata.isPublished
    );
    
    const menu = topLevelPages
      .sort((a, b) => a.metadata.order - b.metadata.order)
      .map((parent) => {
        const children = pages
          .filter(
            (p) =>
              p.parentId === parent.id &&
              p.metadata.showInNav &&
              p.metadata.isPublished
          )
          .sort((a, b) => a.metadata.order - b.metadata.order);
        
        return {
          ...parent,
          children,
        };
      });
    
    return menu;
  },
};
