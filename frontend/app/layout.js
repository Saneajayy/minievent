import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Mini Event Management',
  description: 'Manage and book events easily.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black font-sans antialiased min-h-screen flex flex-col">
        <nav className="border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center bg-white">
            <Link href="/" className="text-xl font-bold tracking-tight text-black">MiniEvent</Link>
            <div className="space-x-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-black transition">Home</Link>
              <Link href="/create-event" className="hover:text-black transition">Create Event</Link>
              <Link href="/book-ticket" className="hover:text-black transition">Book</Link>
              <Link href="/my-bookings" className="hover:text-black transition">My Bookings</Link>
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-4 py-8 flex-1 w-full">
          {children}
        </main>
        <footer className="border-t border-gray-100 py-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MiniEvent Management
        </footer>
      </body>
    </html>
  );
}
