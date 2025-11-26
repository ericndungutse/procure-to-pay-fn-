import React, { useState } from 'react';
import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2';
import { MdOutlineImage } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import useOutsideClick from '../hooks/useOutsideClick';

export default function DropDownManue({ resourceId, dropdownOptions }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const handleCloseMenu = () => setIsOpen(false);
  const ref = useOutsideClick(handleCloseMenu, true);
  const handleClick = () => {
    setIsOpen((curr) => !curr);
  };

  return (
    <nav className='w-fit relative z-50'>
      <button
        className={`group p-1 w-fit  rounded transition-all cursor-pointer duration-400 hover:bg-primary-light hover:text-white ${
          isOpen && 'bg-primary-light parent text-white'
        }`}
        onClick={handleClick}
      >
        <HiEllipsisVertical
          className={`h-[1.5rem] w-[1.5rem] group-hover:text-primary-color ${isOpen && 'text-primary-color'}`}
        />
      </button>

      {isOpen && (
        <ul
          className='bg-white rounded z-40 shadow-xl drop-shadow-xl border flex flex-col w-48 absolute top-[80%] right-9 py-2'
          ref={ref}
        >
          {dropdownOptions.split(',').includes('details') && (
            <li className='group  hover:bg-primary-light hover:text-white'>
              <button
                className='px-6 py-3 size-full text-start  flex items-center gap-2'
                onClick={() => {
                  searchParams.append('modal', 'details');
                  searchParams.append('resource_id', resourceId);
                  setSearchParams(searchParams);
                }}
              >
                <HiEye className='size-[1rem] text-gray-400 group-hover:text-white' /> Details
              </button>
            </li>
          )}

          {dropdownOptions.split(',').includes('edit') && (
            <li className='group hover:bg-primary-light hover:text-white'>
              <button
                className='px-6 py-3 size-full text-start  flex items-center gap-2'
                onClick={() => {
                  searchParams.append('modal', 'edit');
                  searchParams.append('resource_id', resourceId);
                  setSearchParams(searchParams);
                }}
              >
                <HiPencil className='size-[1rem] text-gray-400 group-hover:text-white' /> Edit
              </button>
            </li>
          )}

          {dropdownOptions.split(',').splice(',').includes('update image') && (
            <li className='group hover:bg-primary-light hover:text-white'>
              <button
                className='px-6 py-3 size-full text-start flex items-center gap-2'
                onClick={() => {
                  searchParams.append('modal', 'update-images');
                  searchParams.append('resource_id', resourceId);
                  setSearchParams(searchParams);
                }}
              >
                <MdOutlineImage className='size-[1rem] text-gray-400 group-hover:text-white' />
                Update Image
              </button>
            </li>
          )}

          {dropdownOptions.split(',').splice(',').includes('delete') && (
            <li className='group hover:bg-primary-light hover:text-white'>
              <button
                className='px-6 py-3 size-full text-start flex items-center gap-2'
                onClick={() => {
                  searchParams.append('modal', 'delete');
                  searchParams.append('resource_id', resourceId);
                  setSearchParams(searchParams);
                }}
              >
                <HiTrash className='size-[1rem] text-gray-400 group-hover:text-white' />
                Delete
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
