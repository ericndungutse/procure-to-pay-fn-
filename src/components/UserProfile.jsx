import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useUser } from '../hooks/useUser';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useUser();

  const handleLogout = () => {
    queryClient.clear();
    navigate('/');
  };

  const src =
    user?.user?.user?.profileImg === 'user/profile2.jpg' ? '/default-user.webp' : user?.user?.user?.profileImg;

  return (
    <div className='flex gap-4 items-center '>
      <div className='flex gap-2 items-center'>
        <img
          src={src}
          alt='User Avatar'
          className='block w-9 h-9 object-cover object-center rounded-full outline outline-2 outline-gray-200'
        />
        <span className='font-medium text-base text-gray-600'>{user?.user?.user?.firstName}</span>
      </div>
      <button onClick={handleLogout}>
        {<HiArrowRightOnRectangle className='h-6 w-6 text-primary hover:text-primary-light' />}
      </button>
    </div>
  );
}

export default UserProfile;
