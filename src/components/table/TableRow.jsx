import DropDownManue from '../DropDownManue';
import StatusBadge from '../StatusBadge';

export default function TableRow({ data, headers, dropdownOptions }) {
  const td = headers.map((header, index) => {
    const isImage = header.key === 'imageUrl' || header.key === 'url';
    const isAction = header.key === 'action';
    const isBoolean = typeof data[header.key] === 'boolean';

    let rowContent;

    if (isAction) {
      rowContent = <DropDownManue resourceId={data.id} dropdownOptions={dropdownOptions} />;
    } else if (header.key === 'status') {
      rowContent = <StatusBadge status={data[header.key]} />; // <-- Use StatusBadge here
    } else if (isBoolean) {
      rowContent = data[header.key] ? '✔' : '❌';
    } else if (isImage) {
      rowContent = (
        <div className='h-12 w-16'>
          <img
            src={Array.isArray(data[header.key]) ? data[header.key][0] : data[header.key]}
            className='h-full w-auto'
          />
        </div>
      );
    } else {
      rowContent = data[header.key];
    }

    return (
      <td key={index} className={`text-gray-500 px-6 py-2 ${index !== headers.length ? 'text-left' : 'text-right'}`}>
        {rowContent}
      </td>
    );
  });

  return <tr className='border-b last:border-0'>{td}</tr>;
}
