import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pagesApi } from '../api/pages';

export const usePublicPageBySlug = (slug) => {
  return useQuery({
    queryKey: ['pages', 'public', 'slug', slug],
    queryFn: () => pagesApi.getPublicPageBySlug(slug),
    enabled: !!slug,
  });
};

export const usePublicPageById = (id) => {
  return useQuery({
    queryKey: ['pages', 'public', 'id', id],
    queryFn: () => pagesApi.getPublicPageById(id),
    enabled: !!id,
  });
};

export const usePublicHomepage = () => {
  return useQuery({
    queryKey: ['pages', 'public', 'homepage'],
    queryFn: pagesApi.getPublicHomepage,
  });
};

export const usePublicPagesByCategory = (categoryId) => {
  return useQuery({
    queryKey: ['pages', 'public', 'category', categoryId],
    queryFn: () => pagesApi.getPublicPagesByCategory(categoryId),
    enabled: !!categoryId,
  });
};

export const usePages = (params) => {
  return useQuery({
    queryKey: ['pages', params],
    queryFn: () => pagesApi.getPages(params),
  });
};

export const usePage = (id, params) => {
  return useQuery({
    queryKey: ['pages', id, params],
    queryFn: () => pagesApi.getPage(id, params),
    enabled: !!id,
  });
};

export const useCreatePage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: pagesApi.createPage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
};

export const useUpdatePage = () => {
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
};

export const useDeletePage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: pagesApi.deletePage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
};
