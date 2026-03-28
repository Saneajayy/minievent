'use client';
import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import Link from 'next/link';

export default function CreateEvent() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    total_capacity: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post('/events', {
        ...formData,
        total_capacity: parseInt(formData.total_capacity)
      });
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || err.response?.data?.error || 'Failed to create event');
      setLoading(false);
      setLoading(false);
    }
  };

  if (authLoading) return null;

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-lg mx-auto mt-20 text-center border p-10 rounded-xl bg-gray-50 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-3 text-black">Admin Access Required</h2>
        <p className="text-gray-600 mb-8 max-w-sm">If you are an administrator and want to create a new event, please login with your admin credentials.</p>
        <div className="flex gap-4">
            <Link href="/login" className="bg-black text-white px-6 py-2.5 rounded-md hover:bg-gray-800 transition font-medium">Login as Admin</Link>
            <Link href="/register" className="bg-white text-black border border-gray-300 px-6 py-2.5 rounded-md hover:bg-gray-50 transition font-medium">Register</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-8 animate-in fade-in duration-500 mt-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-black">Create Event</h1>
        <p className="text-gray-500 text-sm mt-1">Host a new experience for the community.</p>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-100">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
          <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition" placeholder="e.g. Next.js Meetup" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition" placeholder="Details about your event..."></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
            <input required type="datetime-local" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Capacity</label>
            <input required type="number" min="1" value={formData.total_capacity} onChange={(e) => setFormData({...formData, total_capacity: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition" placeholder="e.g. 100" />
          </div>
        </div>

        <button disabled={loading} type="submit" className="w-full bg-black text-white font-medium py-2.5 rounded-md text-sm hover:bg-gray-800 transition disabled:opacity-50">
          {loading ? 'Publishing...' : 'Publish Event'}
        </button>
      </form>
    </div>
  );
}
