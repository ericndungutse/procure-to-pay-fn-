import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const { data: user } = useQuery({
    queryKey: ['user'],
  });

  return {
    user,
  };
}
