import React from 'react';

export default function Button({ children, loading, size = 'md', variant = 'primary', onClick }) {
  const sizes = {
    sm: 'px-4 py-1 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-9 py-3 text-lg',
  };

  const variants = {
    primary: `bg-primary hover:bg-primary-light text-white`,
    tertiary: `bg-gray-100 hover:bg-gray-200 text-gray-500 border`,
    secondary: `bg-secondary hover:bg-secondary-light text-white`,
  };

  return (
    <button
      onClick={onClick || null}
      disabled={loading}
      className={`${
        sizes[size]
      } text-center justify-center flex gap-2 items-center font-medium rounded-full transition-all duration-300 ${
        variants[variant]
      } ${loading && 'disabled:bg-primary-light disabled:cursor-wait'}`}
    >
      {loading ? 'Wait...' : children}
    </button>
  );
}
