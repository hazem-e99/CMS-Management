import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pagesApi } from '../../../api/pages';

/**
 * Hook to fetch all pages
 */
export function usePages(params) {
  return useQuery({
    queryKey: ['pages', params],
    queryFn: () => pagesApi.getPages(params),
    select: (response) => response.data || response,
  });
}

/**
 * Hook to fetch single page
 */
export function usePage(id, params = {}) {
  return useQuery({
    queryKey: ['pages', id, params],
    queryFn: () => pagesApi.getPage(id, { includeComponents: true, ...params }),
    select: (response) => response.data || response,
    enabled: !!id,
  });
}

/**
 * Hook to create page with components
 */
export function useCreatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pagesApi.createPageWithComponents, // Use with-components endpoint
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
}

/**
 * Hook to update page
 */
export function useUpdatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pagesApi.updatePage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: ['pages', data.id] });
      }
    },
  });
}

/**
 * Hook to delete page
 */
export function useDeletePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pagesApi.deletePage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
}
