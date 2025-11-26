import Heading from './Heading';
import Button from './Button';
import { HiXMark } from 'react-icons/hi2';

function Prompt({ onConfirm, disabled, onCloseModel, headingText, message, yesText = 'Delete', noText = 'Cancel' }) {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='relative w-[25rem] flex flex-col gap-3 bg-white px-5 py-5 rounded-md'>
        <button
          onClick={onCloseModel}
          className='bg-none border-none p-1 rounded-sm translate-x-2 text-3xl transition-all duration-200 absolute top-2 text-gray-500 right-[1.9rem]'
        >
          <HiXMark />
        </button>
        <Heading text={headingText} variation='h2' />
        <p className='mb-1 text-base'>{message}</p>

        <div className='flex justify-end gap-3'>
          <Button onClick={onConfirm} variant='primary' size='md' loading={disabled}>
            {yesText}
          </Button>
          <Button onClick={onCloseModel} variant='tertiary' size='md'>
            {noText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Prompt;
