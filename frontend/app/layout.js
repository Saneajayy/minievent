import './globals.css';
import { AuthProvider } from '@/lib/authContext';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Mini Event Management',
  description: 'Manage and book events easily.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black font-sans antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <Navigation />
          <main className="max-w-5xl mx-auto px-4 py-8 flex-1 w-full">
            {children}
          </main>
          <footer className="border-t border-gray-100 py-6 text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} MiniEvent Management
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
