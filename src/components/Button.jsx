export default function Button({ children, icon, loading, size = 'md', variant = 'primary', onClick }) {
  const sizes = {
    sm: 'px-2 py-0.5 text-sm',
    md: 'px-3 py-1 text-base',
    lg: 'px-6 py-2 text-lg',
  };

  const variants = {
    primary: `bg-primary hover:bg-primary-light text-white`,
    tertiary: `bg-gray-100 hover:bg-gray-200 text-gray-500 border`,
    secondary: `bg-secondary hover:bg-secondary-light text-white`,
    danger: `bg-red-600 hover:bg-red-700 text-white`,
  };

  return (
    <button
      onClick={onClick || null}
      disabled={loading}
      className={`${
        sizes[size]
      } flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 ${
        variants[variant]
      } ${loading && 'disabled:bg-primary-light disabled:cursor-wait'}`}
    >
      {/* Render icon if provided */}
      {!loading && icon && <span className='flex items-center'>{icon}</span>}
      {loading ? (
        <span className='flex items-center gap-2'>
          <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24' aria-hidden='true'>
            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none'></circle>
            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'></path>
          </svg>
          <span>Wait...</span>
        </span>
      ) : (
        <>{children}</>
      )}
    </button>
  );
}
