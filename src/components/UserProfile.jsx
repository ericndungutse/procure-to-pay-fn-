// src/components/UserProfile.jsx
import { useUser } from '../hooks/useUser';

export default function UserProfile() {
  const {
    user: { user },
  } = useUser();

  return (
    <div className='w-full flex items-center justify-between'>
      {/* LEFT SIDE — System title */}
      <div>
        <h1 className='text-xl font-semibold text-gray-800'>Procure-to-Pay</h1>
        <p className='text-xs text-gray-500'>Mini system — IST assessment</p>
      </div>

      {/* RIGHT SIDE — User info */}
      <div className='flex items-center gap-3'>
        <div className='text-right'>
          <div className='text-sm font-medium text-gray-800'>{user.fullname}</div>
          <div className='text-xs text-gray-500'>{user.email}</div>
        </div>

        <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700'>
          {user.fullname?.charAt(0) ?? user.username?.charAt(0) ?? 'U'}
        </div>
      </div>
    </div>
  );
}
