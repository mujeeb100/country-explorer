'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';

export default function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    deleteCookie('isAuthenticated');
    router.push('/login');
  };

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 bg-white shadow-md">
      <div className="text-lg font-bold">🌍 Country Explorer</div>
      <div className="hidden md:flex gap-6 items-center text-sm">
        <Link href="/" className="hover:text-blue-600 transition">Home</Link>
        <Link href="/favorites" className="hover:text-blue-600 transition">Favorites</Link>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
