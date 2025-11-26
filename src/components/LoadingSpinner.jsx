const LoadingSpinner = () => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='m-12 w-8 aspect-square rounded-full bg-primary border-4 border-secondary animate-ping'></div>
    </div>
  );
};

export default LoadingSpinner;
