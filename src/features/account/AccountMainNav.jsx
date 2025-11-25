import { CiSquareQuestion } from 'react-icons/ci';
import { MdDashboard } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

export default function AccountMainNav() {
  return (
    <nav className='text-primary flex flex-col gap-4'>
      <NavLink
        to='properties'
        className='group px-2 py-1.5 rounded text-lg flex items-center gap-3 hover:bg-primary hover:text-white transition-all duration-400'
      >
        <MdDashboard className='size-[1.5rem]  group-hover:text-white transition-all duration-400 aria-[current=page]:text-primary' />{' '}
        <span className='text-base'>Dashboard</span>
      </NavLink>
      <NavLink
        to='properties'
        className='group px-2 py-1.5 rounded text-lg flex items-center gap-3 hover:bg-primary hover:text-white transition-all duration-400'
      >
        <CiSquareQuestion className='size-[1.5rem]  group-hover:text-white transition-all duration-400 aria-[current=page]:text-primary' />{' '}
        <span className='text-base'>Requests</span>
      </NavLink>
    </nav>
  );
}
