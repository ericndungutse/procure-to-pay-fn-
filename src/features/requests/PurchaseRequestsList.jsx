import React, { useState } from 'react';
import Table from '../../components/table/Table';
import TableSkeleton from '../../components/TableSkeleton';
import { useFetchPurchaseRequests } from '../../hooks/useFetchPurchaseRequests';
import { useUser } from '../../hooks/useUser';
import Button from '../../components/Button';
import { HiPlus } from 'react-icons/hi2';
import CreatePurchaseRequest from './CreatePurchaseRequest';

// Table fields
const fields = [
  { label: 'Title', key: 'title' },
  { label: 'Created By', key: 'created_by_name' },
  { label: 'Amount', key: 'amount' },
  { label: 'Status', key: 'status' },
  { label: 'Created At', key: 'created_at' },
  { label: 'Actions', key: 'action' },
];

export default function PurchaseRequestsList() {
  const { data, isLoading } = useFetchPurchaseRequests();
  const {
    user: { user },
  } = useUser();
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className='flex flex-col gap-3 w-full'>
      {/* Add Purchase Request Button (only for staff) */}
      {user.role === 'staff' && (
        <div className='flex justify-end mb-2'>
          <Button icon={<HiPlus />} size='md' variant='primary' onClick={() => setShowCreate(true)}>
            Add New
          </Button>
        </div>
      )}

      {showCreate && <CreatePurchaseRequest onClose={() => setShowCreate(false)} />}

      {/* Table or Skeleton */}
      {isLoading ? (
        <TableSkeleton headers={fields} />
      ) : (
        <Table headers={fields} data={data} dropdownOptions='details,approve,reject' />
      )}
    </div>
  );
}
