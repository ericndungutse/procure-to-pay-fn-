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
      {icon && !loading && <span className='flex items-center'>{icon}</span>}
      {loading ? 'Wait...' : children}
    </button>
  );
}
