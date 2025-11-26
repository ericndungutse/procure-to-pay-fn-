import LoadingSpinner from '../../components/LoadingSpinner';
import Table from '../../components/table/Table';
import { useFetchPurchaseRequests } from '../../hooks/useFetchPurchaseRequests';

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

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <Table headers={fields} data={data} dropdownOptions='details,approve,reject' />
      <div className='flex justify-between mt-4'></div>
    </>
  );
}
