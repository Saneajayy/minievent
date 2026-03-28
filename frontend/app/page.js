'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get('/events');
      setEvents(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load events. Is the backend running?');
      setLoading(false);
    }
  };

  if (loading) return <div className="py-20 text-center text-gray-500 animate-pulse">Loading events...</div>;
  if (error) return <div className="py-20 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-black">Upcoming Events</h1>
          <p className="text-gray-500 mt-2 text-sm">Discover and book your next experience.</p>
        </div>
        <Link href="/create-event" className="bg-black text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition">
          + New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 text-gray-400 border border-dashed border-gray-200 rounded-lg">
          No events found. Be the first to create one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="group flex flex-col justify-between border border-gray-200 rounded-xl p-5 hover:border-black transition duration-300 bg-white">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h2 className="text-xl font-bold text-black group-hover:underline">{event.title}</h2>
                  <span className="text-xs font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">ID: {event.id}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4 h-10 overflow-hidden text-ellipsis line-clamp-2">{event.description}</p>
                
                <div className="flex justify-between items-center text-sm font-medium mb-5">
                  <span className="text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                     {new Date(event.date).toLocaleDateString()}
                  </span>
                  {event.remaining_tickets > 0 ? (
                     <span className="text-black font-semibold bg-gray-50 px-2 py-1 rounded border border-gray-100">{event.remaining_tickets} left</span>
                  ) : (
                     <span className="text-red-500 font-semibold bg-red-50 px-2 py-1 rounded border border-red-100">Sold Out</span>
                  )}
                </div>
              </div>
              <div>
                 <Link href={`/book-ticket?eventId=${event.id}`} className="block w-full text-center border border-gray-300 rounded-md py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition">
                   Book Now
                 </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
