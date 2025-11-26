import Heading from '../components/Heading';
import PurchaseRequestsList from '../features/requests/PurchaseRequestsList';

function PurchaseRequests() {
  return (
    <div className='flex flex-col gap-4'>
      <Heading text='Purchase Requests' variation='h3' />
      <PurchaseRequestsList />
    </div>
  );
}

export default PurchaseRequests;
