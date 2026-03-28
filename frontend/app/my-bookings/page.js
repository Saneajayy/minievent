'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/lib/authContext';
import Link from 'next/link';

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get(`/users/${user.id}/bookings`);
      setBookings(data);
    } catch (err) {
      setError('Failed to fetch your bookings.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="py-20 text-center text-gray-500 animate-pulse">Loading tickets...</div>;

  if (!user) {
    return (
      <div className="max-w-lg mx-auto mt-20 text-center border p-8 rounded-xl bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Authentication Required</h2>
        <p className="text-gray-600 mb-6">You must be logged in to view your tickets.</p>
        <Link href="/login" className="bg-black text-white px-5 py-2.5 rounded-md hover:bg-gray-800 transition">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 mt-10">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold tracking-tight text-black">My Bookings</h1>
        <p className="text-gray-500 text-sm mt-2">Here are the tickets reserved for <span className="font-semibold text-black">{user.email}</span>.</p>
      </div>

      {error && <div className="text-center text-red-500 mt-8 mb-4 text-sm font-medium bg-red-50 py-3 rounded-md">{error}</div>}

      {bookings && bookings.length === 0 && (
        <div className="text-center py-20 text-gray-400 border border-dashed border-gray-200 rounded-lg max-w-3xl mx-auto mt-8 flex flex-col items-center justify-center">
          <p className="mb-4">You haven't booked any events yet.</p>
          <Link href="/" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition text-sm">Browse Events</Link>
        </div>
      )}

      {bookings && bookings.length > 0 && (
        <div className="mt-10 max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">Event</th>
                <th className="px-6 py-4 font-medium text-gray-900">Date</th>
                <th className="px-6 py-4 font-medium text-gray-900">Seats</th>
                <th className="px-6 py-4 font-medium text-gray-900">Booking Code</th>
                <th className="px-6 py-4 font-medium text-gray-900 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((b) => (
                 <tr key={b.id} className="hover:bg-gray-50 transition">
                   <td className="px-6 py-4 font-medium text-black">{b.event_title}</td>
                   <td className="px-6 py-4 text-gray-600">{new Date(b.event_date).toLocaleDateString()}</td>
                   <td className="px-6 py-4 font-semibold text-black">{b.seats}</td>
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
