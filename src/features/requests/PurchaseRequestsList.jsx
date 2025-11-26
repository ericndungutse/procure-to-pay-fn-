import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import Pagination from '../../components/Pagination';
import StatusBadge from '../../components/StatusBadge';
import Table from '../../components/table/Table';
import { useUser } from '../../hooks/useUser';

// Table fields
const fields = [
  { label: 'Title', key: 'title' },
  { label: 'Created By', key: 'created_by_name' },
  { label: 'Amount', key: 'amount' },
  { label: 'Status', key: 'status' },
  { label: 'Created At', key: 'created_at' },
  { label: 'Actions', key: 'action' },
];

// Sample data
const sampleRequests = [
  {
    id: '97dbfb3b-6979-487d-a69e-a6ef8cbecbd8',
    title: 'Office Table (3 Chairs Support)',
    amount: 141600,
    status: 'approved',
    created_at: '2025-11-25',
    created_by_name: 'Staff Member',
  },
  {
    id: 'a12b3c4d-5678-90ef-abcd-1234567890ef',
    title: 'Laptop Purchase (10 units)',
    amount: 1200000,
    status: 'pending',
    created_at: '2025-11-24',
    created_by_name: 'Eric',
  },
  {
    id: 'b23c4d5e-6789-01fa-bcde-2345678901fa',
    title: 'Projector',
    amount: 90000,
    status: 'rejected',
    created_at: '2025-11-23',
    created_by_name: 'Jane',
  },
  {
    id: 'c34d5e6f-7890-12ab-cdef-3456789012ab',
    title: 'Office Chairs (20 pcs)',
    amount: 180000,
    status: 'approved',
    created_at: '2025-11-22',
    created_by_name: 'Sam',
  },
];

export default function PurchaseRequestsList() {
  const {
    user: { user },
  } = useUser();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setRequests(sampleRequests);
    setLoading(false);
  }, []);

  const handleApprove = (request) => {
    setRequests((prev) => prev.map((r) => (r.id === request.id ? { ...r, status: 'approved' } : r)));
  };

  const handleReject = (request) => {
    setRequests((prev) => prev.map((r) => (r.id === request.id ? { ...r, status: 'rejected' } : r)));
  };

  const displayRequests = requests.map((r) => ({
    ...r,
    amount: new Intl.NumberFormat(undefined, { style: 'currency', currency: 'RWF' }).format(r.amount),
    status: <StatusBadge status={r.status} />,
    action: (() => {
      let options = 'details';
      if (user.role.startsWith('approver') && r.status === 'pending') {
        options += ',approve,reject';
      }
      return options;
    })(),
  }));

  const totalPages = Math.ceil(requests.length / pageSize);
  const paginatedRequests = displayRequests.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <Table headers={fields} data={paginatedRequests} dropdownOptions='details,approve,reject' />
      <div className='flex justify-between mt-4'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          next={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          prev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        />
      </div>
    </>
  );
}
