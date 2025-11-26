import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export const Protect = ({ children }) => {
  const user = useUser();

  if (!user.user) {
    return <Navigate to='/' replace />;
  }

  return children;
};
