// src/components/Dashboard.jsx
import { useUser } from '../hooks/useUser';
import { useFetchPurchaseRequests } from '../hooks/useFetchPurchaseRequests';
import TableSkeleton from '../components/TableSkeleton';
import Table from '../components/table/Table';
import { HiPlus } from 'react-icons/hi2';
import { useMemo } from 'react';
import Button from '../components/Button';
import { HiUserCircle } from 'react-icons/hi';

import { HiOutlineDocumentText, HiOutlineClock, HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';

function Stat({ label, value, valueColor = 'text-gray-800', icon }) {
  const borderMap = {
    'text-primary': 'border-primary',
    'text-yellow-500': 'border-yellow-500',
    'text-green-500': 'border-green-500',
    'text-red-500': 'border-red-500',
    'text-gray-800': 'border-gray-800',
  };

  return (
    <div
      className={`bg-white rounded-xl border p-4 flex items-center gap-4 ${borderMap[valueColor] || 'border-gray-800'}`}
    >
      {icon && <div className={`w-10 h-10 text-3xl flex items-center justify-center ${valueColor}`}>{icon}</div>}
      <div className='flex flex-col'>
        <div className='text-xs text-gray-500'>{label}</div>
        <div className={`mt-1 text-2xl font-semibold ${valueColor}`}>{value}</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const {
    user: { user },
  } = useUser();

  const { data, isLoading } = useFetchPurchaseRequests();

  const stats = useMemo(() => {
    if (!data) return { total: 0, pending: 0, approved: 0, rejected: 0 };
    const total = data.length;
    const pending = data.filter((r) => r.status === 'pending').length;
    const approved = data.filter((r) => r.status === 'approved').length;
    const rejected = data.filter((r) => r.status === 'rejected').length;
    return { total, pending, approved, rejected };
  }, [data]);

  const fields = useMemo(() => {
    const baseFields = [
      { label: 'Title', key: 'title' },
      { label: 'Created By', key: 'created_by_name' },
      { label: 'Amount', key: 'amount' },
      { label: 'Status', key: 'status' },
      { label: 'Created At', key: 'created_at' },
      { label: 'Actions', key: 'action' },
    ];

    if (user.role === 'staff') {
      return baseFields.filter((f) => f.key !== 'created_by_name' && f.key !== 'amount');
    }
    return baseFields;
  }, [user]);

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      {/* Header */}
      <section className='bg-secondary-light rounded-xl shadow p-6 flex justify-between items-center text-white'>
        <div>
          <h2 className='text-2xl font-semibold'>Welcome back, {user.fullname}!</h2>
          <p className='text-sm mt-1 text-gray-200'>
            Role: <span className='font-medium'>{user.role}</span> — manage requests below.
          </p>
        </div>

        {user.role === 'staff' && (
          <Button icon={<HiPlus />} size='md' variant='primary'>
            Add new
          </Button>
        )}
      </section>

      {/* Main Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left: Recent Requests Table */}
        <div className='lg:col-span-2 flex flex-col gap-4'>
          <div className='bg-white rounded-xl border p-4 overflow-x-auto'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-sm font-semibold text-gray-700'>Recent Requests</h3>
              <div className='text-xs text-gray-400'>{isLoading ? 'Loading...' : `${data?.length || 0} shown`}</div>
            </div>

            {isLoading ? (
              <TableSkeleton headers={fields} />
            ) : (
              <Table headers={fields} data={data} dropdownOptions='details,approve,reject' />
            )}
          </div>
        </div>

        {/* Right: Overview */}
        <aside className='flex flex-col gap-4 border rounded-xl'>
          <div className='bg-white rounded-xl p-4'>
            <div className='text-sm font-semibold mb-3 text-secondary'>Overview</div>
            <div className='grid grid-cols-2 gap-3 mt-2'>
              <Stat
                label='Total Requests'
                value={stats.total}
                valueColor='text-primary'
                icon={<HiOutlineDocumentText />}
              />
              <Stat label='Pending' value={stats.pending} valueColor='text-yellow-500' icon={<HiOutlineClock />} />
              <Stat
                label='Approved'
                value={stats.approved}
                valueColor='text-green-500'
                icon={<HiOutlineCheckCircle />}
              />
              <Stat label='Rejected' value={stats.rejected} valueColor='text-red-500' icon={<HiOutlineXCircle />} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
