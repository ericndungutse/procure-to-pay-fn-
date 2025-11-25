/**
 * A component that renders a form row with a label and its corresponding children elements.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {string} props.label - The text for the label.
 * @param {React.ReactNode} props.children - The form elements to be rendered within the row.
 * @returns {JSX.Element} A JSX element representing a vertical form row.
 */
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
