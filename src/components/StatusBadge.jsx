// Badge component for status
function StatusBadge({ status }) {
  const statusMap = {
    approved: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
        statusMap[status?.toLowerCase()] || 'bg-gray-100 text-gray-700'
      }`}
    >
      {status?.toUpperCase()}
    </span>
  );
}
export default StatusBadge;
