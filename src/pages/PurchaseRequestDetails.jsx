import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiCalendar, HiChatBubbleLeft, HiCurrencyDollar, HiDocumentText, HiUser } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Prompt from '../components/Prompt';
import ImageUploader from '../components/ImageUploader';
import StatusBadge from '../components/StatusBadge';
import { useUser } from '../hooks/useUser';
import {
  approvePurchaseRequest,
  fetchPurchaseRequest,
  rejectPurchaseRequest,
} from '../service/purchaseRequest.service';
import { uploadReceipt } from '../service/purchaseRequest.service';
import { uploadProformaToSupabase } from '../service/supabase.service';

export default function PurchaseRequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const currentUser = user?.user;
  const token = user?.token;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // 'approve' | 'reject'
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['purchaseRequest', id],
    queryFn: () => fetchPurchaseRequest(token, id),
    enabled: !!id && !!token,
  });

  const approveMutation = useMutation({
    mutationFn: () => approvePurchaseRequest(token, id),
    onSuccess: (res) => {
      // res expected to be full response with message
      const message = res?.message || 'Purchase request approved';
      toast.success(message);
      queryClient.invalidateQueries(['purchaseRequests']);
      queryClient.invalidateQueries(['purchaseRequest', id]);
      navigate('/account/requests');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to approve');
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (payload) => rejectPurchaseRequest(token, id, payload),
    onSuccess: (res) => {
      const message = res?.message || 'Purchase request rejected';
      toast.success(message);
      queryClient.invalidateQueries(['purchaseRequests']);
      queryClient.invalidateQueries(['purchaseRequest', id]);
      navigate('/account/requests');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to reject');
    },
  });

  if (isLoading)
    return (
      <div className='flex flex-col gap-6'>
        <div className='h-8 w-1/3 bg-gray-200 rounded animate-pulse' />

        <div className='rounded-md overflow-hidden shadow-sm'>
          <div className='bg-primary text-white px-6 py-4 flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='h-6 w-48 bg-white/30 rounded animate-pulse' />
              <div className='h-4 w-80 bg-white/20 rounded animate-pulse' />
            </div>
            <div className='text-right'>
              <div className='h-4 w-32 bg-white/30 rounded animate-pulse mb-2' />
              <div className='h-6 w-24 bg-white/40 rounded animate-pulse' />
            </div>
          </div>

          <div className='bg-white p-6 border-t'>
            <div className='grid grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <div className='h-4 w-40 bg-gray-200 rounded animate-pulse' />
                <div className='h-4 w-full bg-gray-200 rounded animate-pulse' />
                <div className='h-4 w-2/3 bg-gray-200 rounded animate-pulse' />
              </div>
              <div className='space-y-4'>
                <div className='h-4 w-32 bg-gray-200 rounded animate-pulse' />
                <div className='h-4 w-full bg-gray-200 rounded animate-pulse' />
                <div className='h-4 w-1/2 bg-gray-200 rounded animate-pulse' />
              </div>
            </div>

            <div className='mt-6 bg-yellow-50 border border-yellow-100 rounded-md p-4 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='h-6 w-6 bg-yellow-200 rounded animate-pulse' />
                <div>
                  <div className='h-3 w-28 bg-yellow-100 rounded animate-pulse' />
                  <div className='h-5 w-36 bg-yellow-200 rounded animate-pulse mt-2' />
                </div>
              </div>
              <div className='h-4 w-32 bg-yellow-100 rounded animate-pulse' />
            </div>
          </div>
        </div>

        <div className='flex items-center justify-end gap-3'>
          <div className='h-8 w-20 bg-gray-200 rounded animate-pulse' />
          <div className='h-8 w-28 bg-gray-200 rounded animate-pulse' />
        </div>
      </div>
    );
  if (error) return <div className='text-red-600'>Error: {error.message}</div>;

  // Normalize server response shapes to always get the purchase_request object
  const pr =
    data?.purchase_request || // case: query returned { purchase_request: {...} }
    data?.data?.purchase_request || // case: returned wrapper { data: { purchase_request: {...} } }
    data?.data || // case: fetchPurchaseRequest returned data object directly
    data;

  const canApprove = currentUser?.role && currentUser.role.startsWith('approver-level');

  function handleApproveClick() {
    setConfirmAction('approve');
    setConfirmOpen(true);
  }

  function handleRejectClick() {
    setConfirmAction('reject');
    setConfirmOpen(true);
  }

  async function handleConfirm() {
    // Use local loading state and mutateAsync to ensure Prompt updates immediately
    setConfirmLoading(true);
    try {
      if (confirmAction === 'approve') {
        await approveMutation.mutateAsync();
      } else if (confirmAction === 'reject') {
        await rejectMutation.mutateAsync({ reason: 'Rejected via UI' });
      }
    } catch (err) {
      // errors are handled in onError callbacks (toasts), but ensure we don't crash
      console.debug('Confirm action error', err);
    } finally {
      setConfirmLoading(false);
      setConfirmOpen(false);
    }
  }

  const fmtAmount = (val) => (val == null ? '-' : Number(val).toLocaleString());
  const fmtDate = (d) => (d ? new Date(d).toLocaleString() : '-');

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-start justify-between'>
        <div>
          <h2 className='text-2xl font-bold mb-1'>Purchase Request #{pr?.id ?? ''}</h2>
          <div className='flex items-center gap-3'>
            <span className='text-gray-600'>{pr?.title}</span>
            <StatusBadge status={pr?.status} />
          </div>
        </div>

        <div className='text-right'>
          <div className='text-sm text-gray-500'>Created</div>
          <div className='font-medium'>{fmtDate(pr?.created_at)}</div>
        </div>
      </div>

      {/* Banner summary */}
      <div className='rounded-md overflow-hidden shadow-sm'>
        <div className='bg-primary text-white px-6 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='text-lg font-semibold'>Request</div>
            <div className='text-sm opacity-90'>{pr?.description}</div>
          </div>
          <div className='text-right'>
            <div className='text-sm'>{fmtDate(pr?.created_at)}</div>
            <div className='text-lg font-semibold'>{fmtAmount(pr?.amount)}</div>
          </div>
        </div>
        <div className='bg-white p-6 border-t'>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-3'>
              <div className='flex items-center gap-3'>
                <HiUser className='text-secondary-light w-5 h-5' />
                <div>
                  <div className='text-sm text-gray-500'>Requested by</div>
                  <div className='font-medium'>{pr?.created_by_name || pr?.created_by}</div>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <HiChatBubbleLeft className='text-secondary-light w-5 h-5' />
                <div>
                  <div className='text-sm text-gray-500'>Notes</div>
                  <div className='font-medium'>{pr?.notes || pr?.description || '-'}</div>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <HiCalendar className='text-secondary-light w-5 h-5' />
                <div>
                  <div className='text-sm text-gray-500'>Requested on</div>
                  <div className='font-medium'>{fmtDate(pr?.created_at)}</div>
                </div>
              </div>
            </div>

            <div className='space-y-3'>
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <HiDocumentText className='text-secondary-light w-5 h-5' />
                  <div>
                    <div className='text-sm text-gray-500'>Proforma</div>
                    <div>
                      {pr?.proforma ? (
                        <a className='text-primary-color underline' target='_blank' rel='noreferrer' href={pr.proforma}>
                          View Proforma
                        </a>
                      ) : (
                        <span className='text-gray-500'>No proforma</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <HiDocumentText className='text-secondary-light w-5 h-5' />
                  <div>
                    <div className='text-sm text-gray-500'>Purchase Order</div>
                    <div>
                      {pr?.purchase_order ? (
                        <a
                          className='text-primary-color underline'
                          target='_blank'
                          rel='noreferrer'
                          href={pr.purchase_order}
                        >
                          View Purchase Order
                        </a>
                      ) : (
                        <span className='text-gray-500'>No purchase order</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <HiDocumentText className='text-secondary-light w-5 h-5' />
                  <div>
                    <div className='text-sm text-gray-500'>Receipt</div>
                    <div>
                      {pr?.receipt ? (
                        <a className='text-primary-color underline' target='_blank' rel='noreferrer' href={pr.receipt}>
                          View Receipt
                        </a>
                      ) : pr?.status === 'approved' ? (
                        // Approved but no receipt — only creator can upload
                        // Allow the creator (compare IDs as strings) or users with the 'staff' role
                        String(currentUser?.id) === String(pr?.created_by) || currentUser?.role === 'staff' ? (
                          <button
                            type='button'
                            onClick={() => setUploadOpen(true)}
                            className='text-primary-color underline text-sm'
                          >
                            Upload receipt
                          </button>
                        ) : (
                          <button type='button' disabled className='text-gray-400 text-sm cursor-not-allowed'>
                            Upload receipt
                          </button>
                        )
                      ) : (
                        <span className='text-gray-500'>No receipt</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Total price box */}
          <div className='mt-6 bg-yellow-50 border border-yellow-100 rounded-md p-4 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <HiCurrencyDollar className='w-6 h-6 text-yellow-600' />
              <div>
                <div className='text-sm text-yellow-700'>Total price</div>
                <div className='font-semibold text-xl text-yellow-800'>{fmtAmount(pr?.amount)}</div>
              </div>
            </div>
            <div className='text-sm text-yellow-700'>Will pay on approval</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className='flex items-center justify-end gap-3'>
        <Button variant='tertiary' onClick={() => navigate('/account/requests')}>
          Back
        </Button>
        {canApprove && !['approved', 'rejected'].includes(pr?.status) && (
          <>
            <Button variant='primary' onClick={handleApproveClick} loading={approveMutation.isLoading}>
              Approve
            </Button>
            <Button variant='danger' onClick={handleRejectClick} loading={rejectMutation.isLoading}>
              Reject
            </Button>
          </>
        )}
      </div>

      {confirmOpen && (
        <Modal>
          <Prompt
            onConfirm={handleConfirm}
            isLoading={confirmLoading}
            onCloseModel={() => setConfirmOpen(false)}
            headingText={confirmAction === 'approve' ? 'Approve request' : 'Reject request'}
            message={`Are you sure you want to ${confirmAction} this request?`}
            yesText={confirmAction === 'approve' ? 'Approve' : 'Reject'}
            noText='Cancel'
          />
        </Modal>
      )}

      {uploadOpen && (
        <Modal>
          <ImageUploader
            closeModal={() => setUploadOpen(false)}
            uploading={uploading}
            onSubmit={async (files) => {
              setUploading(true);
              try {
                // use first file only
                const file = files && files[0];
                if (!file) throw new Error('No file selected');

                // upload to Supabase bucket (same bucket used for proforma)
                const receiptUrl = await uploadProformaToSupabase(file);

                // notify backend with JSON body { receipt_url }
                await uploadReceipt(token, id, { receipt_url: receiptUrl });

                toast.success('Receipt uploaded');
                queryClient.invalidateQueries(['purchaseRequest', id]);
                queryClient.invalidateQueries(['purchaseRequests']);
                setUploadOpen(false);
              } catch (err) {
                toast.error(err.message || 'Upload failed');
              } finally {
                setUploading(false);
              }
            }}
          />
        </Modal>
      )}
    </div>
  );
}
