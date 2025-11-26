import React from 'react';

import TableHeader from './TableHeader';
import TableRow from './TableRow';

export default function Table({ headers, data, dropdownOptions = 'details,edit,delete' }) {
  return (
    <div className='w-full border rounded-lg py-1.5'>
      <table className='w-full text-base text-left rtl:text-right text-gray-500 border-collapse px-8'>
        <TableHeader headers={headers} />
        <tbody className='bg-white'>
          {data.map((datum) => {
            return <TableRow data={datum} headers={headers} key={datum.id} dropdownOptions={dropdownOptions} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
