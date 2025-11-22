import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pagesService } from '../../../services/pagesService';

/**
 * Hook to fetch all pages
 */
export function usePages() {
  return useQuery({
    queryKey: ['pages'],
    queryFn: pagesService.getPages,
    select: (response) => response.data,
  });
}

/**
 * Hook to fetch single page
 */
export function usePage(id) {
  return useQuery({
    queryKey: ['pages', id],
    queryFn: () => pagesService.getPage(id),
    select: (response) => response.data,
    enabled: !!id,
  });
}

/**
 * Hook to create page
 */
export function useCreatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pagesService.createPage,
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
    mutationFn: ({ id, data }) => pagesService.updatePage(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
      queryClient.invalidateQueries({ queryKey: ['pages', variables.id] });
    },
  });
}

/**
 * Hook to delete page
 */
export function useDeletePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pagesService.deletePage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
}
