'use client';
import { useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/lib/authContext';
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post('/auth/login', { email, password });
            login({ id: data.id, name: data.name, email, role: data.role }, data.token);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to login');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20">
            <div className="border border-gray-200 p-8 rounded-xl shadow-sm bg-white">
                <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
                {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" required
                            placeholder="Admin: admin@example.com | User: user@example.com"
                            className="w-full border border-gray-300 rounded-md p-2 focus:border-black focus:ring-black outline-none transition text-sm"
                            value={email} onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" required
                            placeholder="Hint: admin123 or user123"
                            className="w-full border border-gray-300 rounded-md p-2 focus:border-black focus:ring-black outline-none transition text-sm"
                            value={password} onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit" disabled={loading}
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account? <Link href="/register" className="text-black font-semibold hover:underline">Sign up</Link>
                </div>
            </div>
        </div>
    );
}
