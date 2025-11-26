import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ currentPage, next, totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function nextPage() {
    searchParams.set('page', next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  return (
    <div className='flex items-center justify-center gap-4'>
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`px-3 py-0.5 text-white rounded shadow-md transition-all flex items-center justify-center ${
          currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-secondary hover:bg-secondary-light'
        }`}
      >
        <FaChevronLeft className='w-3 h-3' />
      </button>

      <div className='text-base font-medium text-gray-700'>
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className={`px-3 py-0.5 text-white rounded shadow-md transition-all flex items-center justify-center ${
          currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-secondary hover:bg-secondary-light'
        }`}
      >
        <FaChevronRight className='w-3 h-3' />
      </button>
    </div>
  );
};

export default Pagination;
