import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import LoadingSpinner from './LoadingSpinner';

export const Protect = ({ children }) => {
  const { user, isLoading, isError } = useUser();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !user) {
    return <Navigate to='/' replace />;
  }

  return children;
};
