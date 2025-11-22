import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { surveysService } from '../../../services/surveysService';

export function useSurveys() {
  return useQuery({
    queryKey: ['surveys'],
    queryFn: surveysService.getSurveys,
  });
}

export function useSurvey(id) {
  return useQuery({
    queryKey: ['surveys', id],
    queryFn: () => surveysService.getSurvey(id),
    enabled: !!id,
  });
}

export function useCreateSurvey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: surveysService.createSurvey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
    },
  });
}

export function useUpdateSurvey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => surveysService.updateSurvey(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
      queryClient.invalidateQueries({ queryKey: ['surveys', variables.id] });
    },
  });
}

export function useSubmitResponse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ surveyId, data }) => surveysService.submitResponse(surveyId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['survey-responses', variables.surveyId] });
    },
  });
}

export function useSurveyResponses(surveyId) {
  return useQuery({
    queryKey: ['survey-responses', surveyId],
    queryFn: () => surveysService.getResponses(surveyId),
    enabled: !!surveyId,
  });
}
