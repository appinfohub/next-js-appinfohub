'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useGetAppsQuery } from '../services/api';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { HiOutlineViewGrid, HiOutlinePuzzle, HiOutlineSearch } from 'react-icons/hi';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Fetch apps with search query - only when user types
  const { data } = useGetAppsQuery({
    page: 1,
    limit: 10,
    search: search.trim()
  }, {
    skip: !search.trim(), // Don't fetch until user types
  });
  const searchResults = data?.apps || [];

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('apkpac_admin_token');
    router.push('/admin/login');
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
      setSearch('');
      setShowDropdown(false);
    }
  };

  const isAppsActive = pathname.startsWith('/apps');
  const isGamesActive = pathname.startsWith('/games');

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className="flex items-center">
            <img src="/appinfohublogo.png" alt="AppInfoHub.com Logo" className="h-14 w-auto" width="253" height="98" />
          </Link>
        </div>
        {/* Center: Search */}
        <form onSubmit={handleSearch} className="flex-1 flex justify-center mx-2">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              name="q"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setShowDropdown(e.target.value.trim().length > 0);
              }}
              onFocus={() => search.trim().length > 0 && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              placeholder="Search apps, games, posts..."
              className="w-full pl-12 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900 bg-white shadow placeholder:text-gray-400 font-medium text-base md:text-lg"
              autoComplete="off"
            />
            {showDropdown && search.trim() && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
                {searchResults.map((app) => {
                  const slug = app.name ? app.name.toLowerCase().replace(/\s+/g, '-') : '';
                  return (
                    <Link
                      href={`/app/${encodeURIComponent(slug)}`}
                      key={app._id}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 transition no-underline border-b last:border-b-0"
                      onClick={() => {
                        setShowDropdown(false);
                        setSearch('');
                      }}
                    >
                      <img src={app.icon} alt={app.name} className="w-8 h-8 rounded-lg object-cover border bg-gray-100" />
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-sm text-gray-800 truncate block">{app.name}</span>
                        <span className="text-xs rounded bg-blue-100 text-blue-700 px-2 py-0.5 font-medium">{app.category}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><HiOutlineSearch size={22} /></span>
          </div>
        </form>
        {/* Right: Nav */}
        <nav className="hidden lg:flex gap-2 xl:gap-6 items-center text-gray-800 font-semibold text-base md:text-lg">
          {/* Show logout only on admin routes if admin token exists */}
          {isAdminRoute && typeof window !== 'undefined' && localStorage.getItem('apkpac_admin_token') && (
            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-xl ml-4 font-bold hover:bg-red-700 transition cursor-pointer">
              Logout
            </button>
          )}
          <Link 
            href="/apps" 
            className={isAppsActive ? 'bg-gray-200 text-blue-700 rounded-xl px-3 py-1 shadow font-bold flex items-center gap-2' : 'hover:bg-gray-100 hover:text-blue-700 rounded-xl px-3 py-1 transition flex items-center gap-2'}
          >
            <HiOutlineViewGrid size={20} /> Apps
          </Link>
          <Link 
            href="/games" 
            className={isGamesActive ? 'bg-gray-200 text-blue-700 rounded-xl px-3 py-1 shadow font-bold flex items-center gap-2' : 'hover:bg-gray-100 hover:text-blue-700 rounded-xl px-3 py-1 transition flex items-center gap-2'}
          >
            <HiOutlinePuzzle size={20} /> Games
          </Link>
        </nav>
        {/* Mobile menu icon */}
        <button className="lg:hidden flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none" onClick={() => setMobileMenu((prev) => !prev)} aria-label="Open menu">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Mobile nav menu */}
      {mobileMenu && (
        <div className="lg:hidden bg-white/95 text-blue-900 border-t border-gray-200 shadow-xl animate-fade-in z-50 backdrop-blur px-4 pb-4">
          <div className="flex flex-col gap-2 pt-4">
            <Link 
              href="/apps" 
              className={isAppsActive ? 'bg-gray-200 text-blue-700 rounded-xl px-3 py-2 shadow font-bold flex items-center gap-2' : 'hover:bg-gray-100 hover:text-blue-700 rounded-xl px-3 py-2 transition flex items-center gap-2'} 
              onClick={() => setMobileMenu(false)}
            >
              <HiOutlineViewGrid size={20} /> Apps
            </Link>
            <Link 
              href="/games" 
              className={isGamesActive ? 'bg-gray-200 text-blue-700 rounded-xl px-3 py-2 shadow font-bold flex items-center gap-2' : 'hover:bg-gray-100 hover:text-blue-700 rounded-xl px-3 py-2 transition flex items-center gap-2'} 
              onClick={() => setMobileMenu(false)}
            >
              <HiOutlinePuzzle size={20} /> Games
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;


