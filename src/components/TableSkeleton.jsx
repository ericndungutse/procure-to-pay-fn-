import React from 'react';

export default function TableSkeleton({ headers, rows = 5 }) {
  return (
    <div className='w-full border rounded-lg py-1.5'>
      <table className='w-full text-base text-left text-gray-500 border-collapse px-8'>
        <thead className='bg-[#f9fafb] text-gray-500 border-b'>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className={`px-6 py-3 ${index === 0 ? 'rounded-tl' : ''} ${
                  index === headers.length - 1 ? 'rounded-tr' : ''
                }`}
              >
                <div className='h-4 bg-gray-300 rounded w-3/4 animate-pulse'></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-white'>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className='border-b last:border-0'>
              {headers.map((_, colIndex) => (
                <td key={colIndex} className='px-6 py-2'>
                  <div className='h-4 bg-gray-200 rounded w-full animate-pulse'></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
