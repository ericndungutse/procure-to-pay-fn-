import CenteredLayout from '../components/CenteredLayout';
import Heading from '../components/Heading';
import Logo from '../components/Logo';
import ResponsiveLaout from '../components/ResponsiveLayout';
import LoginForm from '../features/auth/LoginForm';
import { useUser } from '../hooks/useUser';
import LoadingSpinner from '../components/LoadingSpinner';
import { Navigate } from 'react-router-dom';

function Login() {
  const { user, isLoading } = useUser();

  // While verifying token, show spinner
  if (isLoading) return <LoadingSpinner />;

  // If we have a user already, redirect to account
  if (user) {
    return <Navigate to='/account' replace />;
  }

  return (
    <CenteredLayout>
      <Logo />
      <Heading text='Log in to your account' />
      <ResponsiveLaout maxWidth='25rem' otherStyles='bg-white'>
        <LoginForm />
      </ResponsiveLaout>
    </CenteredLayout>
  );
}

export default Login;
