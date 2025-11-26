import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mediaApi } from '../api/media';

export const usePublicMedia = (id) => {
  return useQuery({
    queryKey: ['media', 'public', id],
    queryFn: () => mediaApi.getPublicMedia(id),
    enabled: !!id,
  });
};

export const useMediaLibrary = (params) => {
  return useQuery({
    queryKey: ['media', params],
    queryFn: () => mediaApi.getMediaLibrary(params),
  });
};

export const useMedia = (id) => {
  return useQuery({
    queryKey: ['media', id],
    queryFn: () => mediaApi.getMedia(id),
    enabled: !!id,
  });
};

export const useUploadMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mediaApi.uploadMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });
};

export const useUploadMultipleMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mediaApi.uploadMultipleMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });
};

export const useUpdateMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mediaApi.updateMedia,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: ['media', data.id] });
      }
    },
  });
};

export const useDeleteMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mediaApi.deleteMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });
};

export const useDeleteBulkMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mediaApi.deleteBulkMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });
};

export const useSearchMedia = (params) => {
  return useQuery({
    queryKey: ['media', 'search', params],
    queryFn: () => mediaApi.searchMedia(params),
    enabled: !!params?.searchTerm,
  });
};

export const useReorderMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mediaApi.reorderMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });
};
