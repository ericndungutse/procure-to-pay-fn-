import { useQuery } from '@tanstack/react-query';
import { getMe } from '../service/auth.service';

export function useUser() {
  // read token from localStorage safely
  let token = null;
  try {
    token = localStorage.getItem('token');
  } catch (e) {
    console.log(e);

    token = null;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!token) throw new Error('no-token');
      const result = await getMe();
      // getMe returns { user, token }
      return result;
    },
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    user: data ? { user: data.user, token: data.token } : null,
    token: data?.token || token,
    isLoading,
    isError,
  };
}
