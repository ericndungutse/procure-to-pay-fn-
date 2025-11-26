// src/components/UserProfile.jsx
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '../hooks/useUser';
import { useState } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';
import Prompt from './Prompt';
import { logoutApi } from '../service/auth.service';

export default function UserProfile() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    user: { user },
  } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false), true);

  function performLocalLogout() {
    try {
      localStorage.removeItem('token');
    } catch (e) {
      // ignore
    }

    // clear cached user
    try {
      queryClient.setQueryData(['user'], null);
    } catch (e) {
      // ignore
    }

    navigate('/', { replace: true });
  }

  const [showPrompt, setShowPrompt] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <>
      <div className='w-full flex items-center justify-between'>
      {/* LEFT SIDE — System title */}
      <div>
        <h1 className='text-xl font-semibold text-gray-800'>Procure-to-Pay</h1>
        <p className='text-xs text-gray-500'>Mini system — IST assessment</p>
      </div>

      {/* RIGHT SIDE — User info (clickable) */}
      <div className='flex items-center gap-3'>
        <div className='relative' ref={ref}>
          <button
            type='button'
            onClick={() => setIsOpen((s) => !s)}
            aria-expanded={isOpen}
            className='flex items-center gap-3 px-2 py-1 rounded hover:bg-gray-100'
          >
            <div className='text-right'>
              <div className='text-sm font-medium text-gray-800'>{user.fullname}</div>
              <div className='text-xs text-gray-500'>{user.email}</div>
            </div>

            <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700'>
              {user.fullname?.charAt(0) ?? user.username?.charAt(0) ?? 'U'}
            </div>

            <svg className='w-4 h-4 text-gray-500' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M6 9l6 6 6-6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </button>

            {isOpen && (
            <ul className='absolute right-0 top-[110%] bg-white rounded shadow-md border py-2 w-40 z-50'>
              <li>
                <button
                  type='button'
                  onClick={() => {
                    // open confirmation prompt
                    setIsOpen(false);
                    setShowPrompt(true);
                  }}
                  className='w-full text-left px-4 py-2 text-sm hover:bg-primary hover:text-white'
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
      </div>
      {showPrompt && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30'>
            <Prompt
            headingText='Sign out'
            message='Are you sure you want to sign out of your account?'
            yesText='Sign out'
            noText='Cancel'
            isLoading={isProcessing}
            onCloseModel={() => setShowPrompt(false)}
            onConfirm={async () => {
              setIsProcessing(true);
              try {
                // call backend logout with token
                await logoutApi();

                // only after successful backend logout remove token locally
                performLocalLogout();
              } catch (err) {
                // If logout fails, keep the user logged in and log the error.
                // Optionally show a toast here.
                console.error('Logout failed', err);
              } finally {
                setIsProcessing(false);
                setShowPrompt(false);
              }
            }}
          />
        </div>
      )}
    </>
  );
}
