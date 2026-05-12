import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/axios';
import type { LabelRequest } from '../types/label';

export const useUpdateLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newLabel: LabelRequest) => {
      const { data } = await api.put(`/labels`, newLabel);
      return data;
    },
    onSuccess: (data, variables) => {
      // Refresh both the specific label and the dashboard list
      queryClient.invalidateQueries({ queryKey: ['label', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['labels'] });
    },
  });
};