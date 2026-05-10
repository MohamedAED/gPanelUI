import { useQuery } from '@tanstack/react-query';
import { api } from '../api/axios';

export const useLabelDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ['label', id],
    queryFn: async () => {
      const { data } = await api.get(`/labels/${id}`);
      return data;
    },
    enabled: !!id, // Only run if id is present
  });
};