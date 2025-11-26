import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesApi } from '../api/categories';

export const useNavbarCategories = () => {
  return useQuery({
    queryKey: ['categories', 'navbar'],
    queryFn: categoriesApi.getNavbarCategories,
  });
};

export const usePublicCategory = (id) => {
  return useQuery({
    queryKey: ['categories', 'public', id],
    queryFn: () => categoriesApi.getPublicCategory(id),
    enabled: !!id,
  });
};

export const useCategories = (params) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => categoriesApi.getCategories(params),
  });
};

export const useCategory = (id, params) => {
  return useQuery({
    queryKey: ['categories', id, params],
    queryFn: () => categoriesApi.getCategory(id, params),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoriesApi.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdateCategory = () => {
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
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoriesApi.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useSearchCategories = (searchTerm) => {
  return useQuery({
    queryKey: ['categories', 'search', searchTerm],
    queryFn: () => categoriesApi.searchCategories(searchTerm),
    enabled: !!searchTerm,
  });
};

export const useReorderCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoriesApi.reorderCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
