import Heading from './Heading';
import Button from './Button';
import { HiXMark } from 'react-icons/hi2';

function Prompt({
  onConfirm,
  disabled,
  isLoading = false,
  onCloseModel,
  headingText,
  message,
  yesText = 'Delete',
  noText = 'Cancel',
}) {
  // Support legacy `disabled` prop by treating it as loading as well
  const loading = Boolean(isLoading || disabled);

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='relative w-[25rem] flex flex-col gap-3 bg-white px-5 py-5 rounded-md'>
        <button
          onClick={() => !loading && onCloseModel && onCloseModel()}
          className='bg-none border-none p-1 rounded-sm translate-x-2 text-3xl transition-all duration-200 absolute top-2 text-gray-500 right-[1.9rem]'
          aria-label='close'
        >
          <HiXMark />
        </button>
        <Heading text={headingText} variation='h2' />
        <p className='mb-1 text-base'>{message}</p>

        {loading && (
          <div className='flex items-center gap-2 text-sm text-gray-600 mt-1'>
            <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24' aria-hidden='true'>
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
                fill='none'
              ></circle>
              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'></path>
            </svg>
            <span>Processing…</span>
          </div>
        )}

        <div className='flex justify-end gap-3'>
          <Button onClick={onConfirm} variant='primary' size='md' loading={loading}>
            {yesText}
          </Button>
          <Button onClick={() => !loading && onCloseModel && onCloseModel()} variant='tertiary' size='md'>
            {noText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Prompt;
