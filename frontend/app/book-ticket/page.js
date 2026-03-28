'use client';
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/lib/authContext';
import Link from 'next/link';

function BookTicketForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialEventId = searchParams.get('eventId') || '';
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    event_id: initialEventId
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (!user) {
    return (
      <div className="max-w-lg mx-auto mt-20 text-center border p-8 rounded-xl bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Authentication Required</h2>
        <p className="text-gray-600 mb-6">You must be logged in to book a ticket.</p>
        <Link href="/login" className="bg-black text-white px-5 py-2.5 rounded-md hover:bg-gray-800 transition">Go to Login</Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const { data } = await api.post('/bookings', {
        event_id: parseInt(formData.event_id)
      });
      setSuccess(`Ticket booked successfully! Your booking code is: ${data.booking_code}`);
      setFormData({ event_id: '' });
      setTimeout(() => router.push('/my-bookings'), 3000);
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || err.response?.data?.error || 'Failed to book ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-8 animate-in fade-in duration-500 mt-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-black">Book a Ticket</h1>
        <p className="text-gray-500 text-sm mt-1">Reserve your spot for an upcoming event as <span className="font-semibold text-black">{user.name}</span>.</p>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-100">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 p-4 rounded-md text-sm border border-green-200 font-medium">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event ID</label>
          <input required type="number" min="1" value={formData.event_id} onChange={(e) => setFormData({...formData, event_id: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition" placeholder="Enter Event ID" />
        </div>

        <button disabled={loading || success} type="submit" className="w-full bg-black text-white font-medium py-2.5 rounded-md text-sm hover:bg-gray-800 transition disabled:opacity-50">
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}

export default function BookTicket() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-500 animate-pulse">Loading...</div>}>
      <BookTicketForm />
    </Suspense>
  );
}
