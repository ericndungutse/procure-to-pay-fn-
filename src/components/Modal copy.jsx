import React from 'react';

export function ModalOverlay({ children }) {
  return (
    <div className='fixed top-0 left-0 flex justify-center w-full h-screen bg-gray-400 bg-opacity-70 backdrop-blur-sm z-[1000] transition-all duration-500 overflow-auto'>
      {children}
    </div>
  );
}

function Modal({ children }) {
  return (
    <ModalOverlay>
      <div className='transition-all duration-500 h-auto w-max py-8'>
        {children}
        <div className='h-20 w-full'></div>
      </div>
    </ModalOverlay>
  );
}

export default Modal;
