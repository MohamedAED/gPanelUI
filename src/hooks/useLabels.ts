import { useQuery } from '@tanstack/react-query';
import { api } from '../api/axios';

export const useLabels = () => {
  return useQuery({
    queryKey: ['labels'],
    queryFn: async () => {
      const { data } = await api.get('/labels');
      return data; // Assumes your backend returns an array of label objects
    },
  });
};