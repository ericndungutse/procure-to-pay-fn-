function VerticalFormRow({ label, children, error }) {
  return (
    <div className='flex flex-col gap-1 w-full'>
      <label htmlFor={label} className='text-base font-semibold'>
        {label}
      </label>
      {children}
      {error && <Error>{error}</Error>}
    </div>
  );
}

function Error({ children }) {
  return <span className='text-red-500 text-base'>{children}</span>;
}
export default VerticalFormRow;
