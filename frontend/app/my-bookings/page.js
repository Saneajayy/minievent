'use client';
import { useState } from 'react';
import api from '@/lib/api';

export default function MyBookings() {
  const [userId, setUserId] = useState('');
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = async (e) => {
    e.preventDefault();
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/users/${userId}/bookings`);
      setBookings(data);
    } catch (err) {
      setError('Failed to fetch bookings. Are you sure you entered the correct User ID?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 mt-10">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold tracking-tight text-black">My Bookings</h1>
        <p className="text-gray-500 text-sm mt-2">Enter your User ID to view your tickets.</p>
        
        <form onSubmit={fetchBookings} className="mt-6 flex gap-3">
          <input 
            type="number" 
            min="1" 
            required 
            placeholder="User ID (e.g. 1)" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition"
          />
          <button disabled={loading} type="submit" className="bg-black text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50">
             {loading ? 'Searching...' : 'View Tickets'}
          </button>
        </form>
      </div>

      {error && <div className="text-center text-red-500 mt-8 mb-4 text-sm font-medium bg-red-50 py-3 rounded-md">{error}</div>}

      {bookings && bookings.length === 0 && (
        <div className="text-center py-20 text-gray-400 border border-dashed border-gray-200 rounded-lg max-w-3xl mx-auto mt-8">
          You haven't booked any events yet.
        </div>
      )}

      {bookings && bookings.length > 0 && (
        <div className="mt-10 max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">Event</th>
                <th className="px-6 py-4 font-medium text-gray-900">Date</th>
                <th className="px-6 py-4 font-medium text-gray-900">Booking Code</th>
                <th className="px-6 py-4 font-medium text-gray-900 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((b) => (
                 <tr key={b.id} className="hover:bg-gray-50 transition">
                   <td className="px-6 py-4 font-medium text-black">{b.event_title}</td>
                   <td className="px-6 py-4 text-gray-600">{new Date(b.event_date).toLocaleDateString()}</td>
                   <td className="px-6 py-4">
                     <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200 text-gray-600">{b.booking_code}</span>
                   </td>
                   <td className="px-6 py-4 text-right">
                     <span className="text-green-600 font-medium text-xs bg-green-50 border border-green-100 px-2 py-1 rounded">Confirmed</span>
                   </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
