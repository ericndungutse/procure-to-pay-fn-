// src/components/Dashboard.jsx
import { useEffect, useMemo, useState } from 'react';
import { useUser } from '../hooks/useUser';

function Stat({ label, value }) {
  return (
    <div className='bg-white rounded-xl shadow-sm p-4 flex flex-col'>
      <div className='text-xs text-gray-500'>{label}</div>
      <div className='mt-2 text-2xl font-semibold text-gray-800'>{value}</div>
    </div>
  );
}

function Badge({ status }) {
  const map = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
        map[status] || 'bg-gray-100 text-gray-700'
      }`}
    >
      {status}
    </span>
  );
}

export default function Dashboard() {
  const {
    user: { user },
  } = useUser();
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  async function fetchRequests() {
    setLoading(true);
    try {
      setRequests([
        {
          id: 'r1',
          title: 'Buy Laptops (10)',
          amount: 12000,
          status: 'PENDING',
          created_by: 'Eric',
          created_at: '2025-11-19',
        },
        {
          id: 'r2',
          title: 'Office Chairs',
          amount: 1800,
          status: 'APPROVED',
          created_by: 'Jane',
          created_at: '2025-11-18',
        },
        { id: 'r3', title: 'Projector', amount: 900, status: 'REJECTED', created_by: 'Sam', created_at: '2025-11-17' },
      ]);
    } catch (err) {
      console.error('fetchRequests error', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter((r) => r.status === 'PENDING').length;
    const approved = requests.filter((r) => r.status === 'APPROVED').length;
    const rejected = requests.filter((r) => r.status === 'REJECTED').length;
    return { total, pending, approved, rejected };
  }, [requests]);

  const visible = useMemo(() => {
    if (user.role === 'staff') return requests;
    if (user.role.startsWith('approver')) return requests.filter((r) => r.status === 'PENDING');
    if (user.role === 'finance') return requests.filter((r) => r.status === 'APPROVED');
    return requests;
  }, [requests, user]);

  const handleApprove = (req) =>
    setRequests((prev) => prev.map((r) => (r.id === req.id ? { ...r, status: 'APPROVED' } : r)));
  const handleReject = (req) =>
    setRequests((prev) => prev.map((r) => (r.id === req.id ? { ...r, status: 'REJECTED' } : r)));
  const handleReceiptUpload = (req, file) => file && alert(`Receipt "${file.name}" uploaded for ${req.title}`);

  return (
    <div className='flex flex-col gap-4'>
      <section className='bg-white rounded-xl shadow p-6'>
        <div className='flex items-start justify-between'>
          <div>
            <h2 className='text-lg font-semibold text-gray-800'>Welcome back, {user.fullname}!</h2>
            <p className='text-sm text-gray-600 mt-1'>
              Role: <span className='font-medium'>{user.role}</span> — manage requests below.
            </p>
          </div>

          <div className='flex items-center gap-3'>
            {user.role === 'staff' && (
              <button
                onClick={() => alert('Open new request form')}
                className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
              >
                New Purchase Request
              </button>
            )}
            <button onClick={fetchRequests} className='px-3 py-2 border rounded-md text-sm'>
              Refresh
            </button>
          </div>
        </div>
      </section>

      {/* Main grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left */}
        <div className='lg:col-span-2 flex flex-col gap-6'>
          {/* Requests Table */}
          <div className='bg-white rounded-xl shadow p-4 overflow-x-auto'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-sm font-semibold text-gray-700'>Recent Requests</h3>
              <div className='text-xs text-gray-400'>{loading ? 'Loading...' : `${visible.length} shown`}</div>
            </div>

            <table className='min-w-full text-left'>
              <thead>
                <tr>
                  <th className='px-3 py-2 text-xs text-gray-500'>Title</th>
                  <th className='px-3 py-2 text-xs text-gray-500'>By</th>
                  <th className='px-3 py-2 text-xs text-gray-500'>Amount</th>
                  <th className='px-3 py-2 text-xs text-gray-500'>Status</th>
                  <th className='px-3 py-2 text-xs text-gray-500'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.length === 0 ? (
                  <tr>
                    <td colSpan={5} className='px-3 py-6 text-center text-sm text-gray-500'>
                      No requests
                    </td>
                  </tr>
                ) : (
                  visible.map((r) => (
                    <tr key={r.id} className='border-t'>
                      <td className='px-3 py-3 text-sm'>{r.title}</td>
                      <td className='px-3 py-3 text-sm'>{r.created_by}</td>
                      <td className='px-3 py-3 text-sm'>${r.amount.toLocaleString()}</td>
                      <td className='px-3 py-3 text-sm'>
                        <Badge status={r.status} />
                      </td>
                      <td className='px-3 py-3 text-sm'>
                        <div className='flex gap-2'>
                          {user.role.startsWith('approver') && r.status === 'PENDING' && (
                            <>
                              <button
                                onClick={() => handleApprove(r)}
                                className='px-2 py-1 rounded-md bg-green-600 text-white text-sm'
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(r)}
                                className='px-2 py-1 rounded-md bg-red-600 text-white text-sm'
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {user.role === 'staff' && r.status === 'APPROVED' && (
                            <label className='px-2 py-1 rounded-md bg-blue-600 text-white text-sm cursor-pointer'>
                              Upload Receipt
                              <input
                                type='file'
                                className='hidden'
                                onChange={(e) => handleReceiptUpload(r, e.target.files?.[0])}
                              />
                            </label>
                          )}

                          <button
                            onClick={() => alert(JSON.stringify(r, null, 2))}
                            className='px-2 py-1 rounded-md border text-sm'
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right */}
        <aside className='flex flex-col gap-6'>
          <div className='bg-white rounded-xl shadow p-4'>
            <div className='text-xs text-gray-500'>Overview</div>
            <div className='mt-1 text-sm font-semibold text-gray-800'>{user.role}</div>

            <div className='grid grid-cols-2 gap-3 mt-4'>
              <Stat label='Total' value={stats.total} />
              <Stat label='Pending' value={stats.pending} />
              <Stat label='Approved' value={stats.approved} />
              <Stat label='Rejected' value={stats.rejected} />
            </div>
          </div>

          {user.role === 'finance' && (
            <div className='bg-white rounded-xl shadow p-4'>
              <div className='text-sm font-semibold text-gray-800'>Finance</div>
              <p className='text-xs text-gray-500'>Export & validation</p>
              <div className='mt-3 flex flex-col gap-2'>
                <button className='px-3 py-2 rounded-md bg-indigo-600 text-white text-sm'>Export Approved</button>
                <button className='px-3 py-2 rounded-md border text-sm'>Receipt Validation</button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
