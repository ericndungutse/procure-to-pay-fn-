import React from 'react';

import { Outlet } from 'react-router-dom';
import UserProfile from '../../components/UserProfile';
import AccountAsideBar from './AccountSideBar';

export default function AccountLayout() {
  return (
    <section className='bg-white w-screen h-screen flex'>
      <AccountAsideBar />
      <main className='bg-[#f9fafb] flex-1 h-full flex flex-col'>
        <div className='py-4 border-b px-12 flex justify-end items-center bg-white'>
          <UserProfile />
        </div>

        <div className='overflow-auto py-4 px-12 h-full'>
          <Outlet />
        </div>
      </main>
    </section>
  );
}
