import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/axios';
import type { LabelRequest } from '../types/label';

export const useCreateLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newLabel: LabelRequest) => {
      const { data } = await api.post('/labels', newLabel);
      return data;
    },
    onSuccess: () => {
      // Invalidate the 'labels' query to trigger an automatic refresh of the DataGrid
      queryClient.invalidateQueries({ queryKey: ['labels'] });
    },
  });
};