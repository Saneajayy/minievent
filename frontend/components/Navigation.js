'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';

export default function Navigation() {
    const { user, logout, loading } = useAuth();
    
    if (loading) return null;

    return (
        <nav className="border-b border-gray-200">
            <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center bg-white">
                <Link href="/" className="text-xl font-bold tracking-tight text-black">MiniEvent</Link>
                <div className="space-x-6 text-sm font-medium text-gray-600 flex items-center">
                    <Link href="/" className="hover:text-black transition">Home</Link>
                    <Link href="/create-event" className="hover:text-black transition">Create Event</Link>
                    
                    {user && (
                        <>
                            <Link href="/book-ticket" className="hover:text-black transition">Book</Link>
                            <Link href="/my-bookings" className="hover:text-black transition">My Bookings</Link>
                            <div className="pl-6 border-l border-gray-200 flex items-center space-x-4">
                                <span className="text-black font-semibold">{user.name}</span>
                                <button onClick={logout} className="text-gray-500 hover:text-red-500 transition">Logout</button>
                            </div>
                        </>
                    )}
                    
                    {!user && (
                        <div className="pl-6 border-l border-gray-200 flex items-center space-x-4">
                            <Link href="/login" className="bg-black text-white px-3 py-1.5 rounded hover:bg-gray-800 transition">Log In</Link>
                            <Link href="/register" className="bg-black text-white px-3 py-1.5 rounded hover:bg-gray-800 transition">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
