'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiOutlineViewGrid, HiOutlineDocumentText, HiOutlineCog } from 'react-icons/hi';
import { MdApps } from "react-icons/md";
import ReduxProvider from '@/app/providers/ReduxProvider';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('apkpac_admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Checking authorization...</p>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('apkpac_admin_token');
    router.push('/admin/login');
  };

  return (
    <ReduxProvider>
      <div className="flex min-h-screen">
        <aside className="w-64 bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-800 text-white flex flex-col p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <HiOutlineCog size={32} className="text-yellow-400" />
            <h2 className="text-2xl font-extrabold tracking-wide">Admin Panel</h2>
          </div>
          <hr className="border-indigo-700" />
          <nav className="flex flex-col gap-3 pt-10">
            <Link href="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-800 transition font-medium text-lg">
              <MdApps size={22} className="text-pink-400" /> Home
            </Link>
            <Link href="/admin/dashboard/categories" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-800 transition font-medium text-lg">
              <HiOutlineViewGrid size={22} className="text-yellow-400" /> Categories
            </Link>
            <Link href="/admin/dashboard/apps" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-800 transition font-medium text-lg">
              <HiOutlineViewGrid size={22} className="text-orange-400" /> Apps
            </Link>
          </nav>
        </aside>
        <main className="flex-1 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 p-8 min-h-screen">
          <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-indigo-700">Admin Dashboard</h1>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-red-700 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
            {children}
          </div>
        </main>
      </div>
    </ReduxProvider>
  );
}

