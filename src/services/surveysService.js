import api from './api';

/**
 * Surveys Service - API calls for surveys and responses
 */

export const surveysService = {
  /**
   * Get all surveys
   */
  getSurveys: async () => {
    return api.get('/surveys');
  },

  /**
   * Get single survey by ID
   */
  getSurvey: async (id) => {
    return api.get(`/surveys/${id}`);
  },

  /**
   * Create new survey
   */
  createSurvey: async (data) => {
    return api.post('/surveys', data);
  },

  /**
   * Update survey
   */
  updateSurvey: async (id, data) => {
    return api.put(`/surveys/${id}`, data);
  },

  /**
   * Delete survey
   */
  deleteSurvey: async (id) => {
    return api.delete(`/surveys/${id}`);
  },

  /**
   * Submit survey response
   */
  submitResponse: async (surveyId, data) => {
    return api.post('/survey-responses', {
      surveyId,
      ...data,
      submittedAt: new Date().toISOString(),
    });
  },

  /**
   * Get all responses for a survey
   */
  getResponses: async (surveyId) => {
    const allResponses = await api.get('/survey-responses');
    return allResponses.filter((response) => response.surveyId === surveyId);
  },

  /**
   * Get all responses
   */
  getAllResponses: async () => {
    return api.get('/survey-responses');
  },
};
