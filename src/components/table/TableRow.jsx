import DropDownManue from '../DropDownManue';

export default function TableRow({ data, headers, dropdownOptions }) {
  const td = headers.map((header, index) => {
    const isImage = header.key === 'imageUrl' || header.key === 'url';

    const isAction = header.key === 'action';
    const isBoolean = typeof data[header.key] === 'boolean';
    const rowContent = isAction ? (
      <DropDownManue resourceId={data.id} dropdownOptions={dropdownOptions} />
    ) : isBoolean ? (
      data[header.key] ? (
        '✔'
      ) : (
        '❌'
      )
    ) : isImage ? (
      <div className='h-12 w-16'>
        <img src={Array.isArray(data[header.key]) ? data[header.key][0] : data[header.key]} className='h-full w-auto' />
      </div>
    ) : (
      data[header.key]
    );

    return (
      <td
        key={index}
        className={`text-gray-500 px-6 py-2 ${index !== headers.length ? 'text-left' : 'text-right'} ${
          index + 1 === 1 ? 'font-medium' : ''
        } `}
      >
        {rowContent}
      </td>
    );
  });

  return <tr className='border-b last:border-0'>{td}</tr>;
}
