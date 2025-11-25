import CenteredLayout from '../components/CenteredLayout';
import Heading from '../components/Heading';
import Logo from '../components/Logo';
import ResponsiveLaout from '../components/ResponsiveLayout';
import LoginForm from '../features/auth/LoginForm';

function Login() {
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
