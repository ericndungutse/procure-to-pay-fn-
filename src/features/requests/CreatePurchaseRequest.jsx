import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import VerticalFormRow from '../../components/VerticalFormRow';
import { useUser } from '../../hooks/useUser';
import { createPurchaseRequest } from '../../service/purchaseRequest.service';
import { uploadProformaToSupabase } from '../../service/supabase.service';

export default function CreatePurchaseRequest({ onClose }) {
  const { user } = useUser();
  const token = user?.token;
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [proformaFile, setProformaFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setProformaFile(e.target.files && e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !description || !amount) {
      setError('Please fill all required fields.');
      return;
    }

    setLoading(true);
    try {
      let proformaUrl = null;

      if (proformaFile) {
        // Upload directly to Supabase storage and get signed URL
        proformaUrl = await uploadProformaToSupabase(proformaFile, '');
      }

      const body = {
        title,
        description,
        amount: Number(amount),
        proforma: proformaUrl,
      };

      // Create request on backend
      await createPurchaseRequest(token, body);

      // Refresh purchase requests list
      queryClient.invalidateQueries(['purchaseRequests']);

      setLoading(false);
      if (onClose) onClose();
    } catch (err) {
      setLoading(false);
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <Modal>
      <div className='max-w-lg bg-white rounded-md p-6 shadow-md'>
        <h3 className='text-xl font-semibold mb-4'>Create Purchase Request</h3>
        {error && <p className='text-red-600 mb-3'>{error}</p>}

        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <VerticalFormRow label='Title'>
            <input
              className='border border-gray-300 rounded-md px-2 py-1.5 shadow-sm bg-white w-full focus:border-[#b07c19] outline-none'
              type='text'
              value={title}
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)}
            />
          </VerticalFormRow>

          <VerticalFormRow label='Description'>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='border border-gray-300 rounded-md p-2 w-full h-28'
              placeholder='Description'
            />
          </VerticalFormRow>

          <VerticalFormRow label='Amount'>
            <input
              className='border border-gray-300 rounded-md px-2 py-1.5 shadow-sm bg-white w-full focus:border-[#b07c19] outline-none'
              type='number'
              value={amount}
              placeholder='Amount'
              onChange={(e) => setAmount(e.target.value)}
            />
          </VerticalFormRow>

          <VerticalFormRow label='Proforma (PDF)'>
            <input type='file' accept='application/pdf' onChange={handleFileChange} />
          </VerticalFormRow>

          <div className='flex justify-end gap-3 mt-2'>
            <Button type='submit' variant='primary' loading={loading}>
              {loading ? 'Creating...' : 'Create'}
            </Button>
            <Button type='button' variant='tertiary' onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
