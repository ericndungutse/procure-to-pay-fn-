import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import VerticalFormRow from '../../components/VerticalFormRow';
import Button from '../../components/Button';

function LoginForm() {
  const [errorMessane, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setErrorMessage('');
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='p-6 border border-gray-200 rounded-md text-base w-full flex flex-col gap-3'
    >
      {errorMessane && <div className='text-red-500 bg-red-200 text-center capitalize p-2 rounded'>{errorMessane}</div>}
      <VerticalFormRow label='Email address' error={errors['email'] && errors['email'].message}>
        <Input type='email' id='email' register={register('email', { required: 'Email is required' })} />
      </VerticalFormRow>

      <VerticalFormRow label='Password' error={errors['password'] && errors['password'].message}>
        <Input type='password' id='password' register={register('password', { required: 'Password is required' })} />
      </VerticalFormRow>

      <VerticalFormRow>
        <Button type='submit'>Log in</Button>
      </VerticalFormRow>
    </form>
  );
}

export default LoginForm;
