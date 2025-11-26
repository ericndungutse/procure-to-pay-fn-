import { useQuery } from '@tanstack/react-query';
import { fetchPurchaseRequests } from '../service/purchaseRequest.service';
import { useUser } from './useUser';

export function useFetchPurchaseRequests() {
  const {
    user: { token },
  } = useUser();

  const query = useQuery({
    queryKey: ['purchaseRequests'],
    queryFn: () => fetchPurchaseRequests(token),
  });

  return query;
}
