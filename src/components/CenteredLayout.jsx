function CenteredLayout({ children }) {
  return <div className='flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-50'>{children}</div>;
}

export default CenteredLayout;
