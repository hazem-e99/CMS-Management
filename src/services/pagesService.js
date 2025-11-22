const API_URL = 'http://localhost:3001';

/**
 * Pages Service - Using JSON Server REST API
 */
export const pagesService = {
  /**
   * Get all pages
   */
  getPages: async () => {
    const response = await fetch(`${API_URL}/pages`);
    const data = await response.json();
    return { data };
  },

  /**
   * Get single page by ID
   */
  getPage: async (id) => {
    const response = await fetch(`${API_URL}/pages/${id}`);
    const data = await response.json();
    return { data };
  },

  /**
   * Create new page
   */
  createPage: async (pageData) => {
    const newPage = {
      id: `page-${Date.now()}`,
      ...pageData,
      sections: [],
      metadata: {
        ...pageData.metadata,
        showInNav: pageData.metadata?.showInNav ?? true,
        isPublished: pageData.metadata?.isPublished ?? false,
        order: pageData.metadata?.order ?? 999,
      },
    };

    const response = await fetch(`${API_URL}/pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPage),
    });
    const data = await response.json();
    return { data };
  },

  /**
   * Update existing page
   */
  updatePage: async (id, pageData) => {
    const response = await fetch(`${API_URL}/pages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pageData),
    });
    const data = await response.json();
    return { data };
  },

  /**
   * Delete page
   */
  deletePage: async (id) => {
    await fetch(`${API_URL}/pages/${id}`, {
      method: 'DELETE',
    });
    return { data: { success: true } };
  },

  /**
   * Update page sections
   */
  updatePageSections: async (id, sections) => {
    // First get the page
    const pageResponse = await fetch(`${API_URL}/pages/${id}`);
    const page = await pageResponse.json();
    
    // Update with new sections
    const response = await fetch(`${API_URL}/pages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...page,
        sections,
      }),
    });
    const data = await response.json();
    return { data };
  },
};

