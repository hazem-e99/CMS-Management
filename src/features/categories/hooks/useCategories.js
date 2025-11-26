import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesApi } from '../../../api/categories';

export function useCategories(params) {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => categoriesApi.getCategories(params),
    select: (response) => response.data || response,
  });
}

export function useCategory(id, params) {
  return useQuery({
    queryKey: ['categories', id, params],
    queryFn: () => categoriesApi.getCategory(id, params),
    select: (response) => response.data || response,
    enabled: !!id,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoriesApi.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoriesApi.updateCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: ['categories', data.id] });
      }
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoriesApi.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}
