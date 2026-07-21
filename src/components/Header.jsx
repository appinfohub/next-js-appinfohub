'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useGetAppsQuery } from '../services/api';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  HiOutlineViewGrid, 
  HiOutlinePuzzle, 
  HiOutlineSearch, 
  HiX, 
  HiLogout, 
  HiMenu,
  HiChevronRight
} from 'react-icons/hi';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  const [search, setSearch] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch apps with search query - only when user types
  const { data, isFetching } = useGetAppsQuery(
    {
      page: 1,
      limit: 8,
      search: search.trim()
    },
    {
      skip: !search.trim(),
    }
  );

  const searchResults = data?.apps || [];

  const handleLogout = () => {
    localStorage.removeItem('apkpac_admin_token');
    router.push('/admin/login');
  };

  useEffect(() => {
    setMobileMenu(false);
    setShowDropdown(false);
    setShowSearchInput(false);
  }, [pathname]);

  // Handle outside click to close search bar & dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowDropdown(false);
        if (!search) {
          setShowSearchInput(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [search]);

  // Auto focus input when search button is clicked
  useEffect(() => {
    if (showSearchInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearchInput]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setShowDropdown(false);
      setShowSearchInput(false);
    }
  };

  const isAppsActive = pathname.startsWith('/apps');
  const isGamesActive = pathname.startsWith('/games');

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <img 
              src="/appinfohublogo.png" 
              alt="AppInfoHub Logo" 
              className="h-9 w-auto object-contain" 
            />
          </Link>
        </div>

        {/* Center: Clean Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/apps" 
            className={`flex items-center gap-2 text-base font-medium transition-colors ${
              isAppsActive 
                ? 'text-blue-600 font-semibold' 
                : 'text-gray-700 hover:text-black'
            }`}
          >
            <HiOutlineViewGrid className="size-5 text-gray-500" />
            Apps
          </Link>

          <Link 
            href="/games" 
            className={`flex items-center gap-2 text-base font-medium transition-colors ${
              isGamesActive 
                ? 'text-blue-600 font-semibold' 
                : 'text-gray-700 hover:text-black'
            }`}
          >
            <HiOutlinePuzzle className="size-5 text-gray-500" />
            Games
          </Link>

          {isAdminRoute && typeof window !== 'undefined' && localStorage.getItem('apkpac_admin_token') && (
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-1.5 text-base font-medium text-red-600 hover:text-red-700 transition"
            >
              <HiLogout className="size-5" />
              Logout
            </button>
          )}
        </nav>

        {/* Right: Search Toggle & Expandable Bar */}
        <div className="flex items-center gap-3 relative" ref={searchContainerRef}>
          {showSearchInput ? (
            <form onSubmit={handleSearch} className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowDropdown(e.target.value.trim().length > 0);
                }}
                placeholder="Search..."
                className="w-48 sm:w-64 pl-4 pr-8 py-1.5 text-sm bg-gray-100 rounded-full text-gray-900 border border-transparent focus:outline-none focus:bg-white focus:border-gray-300 transition-all"
              />
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setShowSearchInput(false);
                  setShowDropdown(false);
                }}
                className="absolute right-2.5 text-gray-400 hover:text-gray-600 p-0.5 rounded-full"
              >
                <HiX className="size-4" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowSearchInput(true)}
              aria-label="Open Search"
              className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition"
            >
              <HiOutlineSearch className="size-6" />
            </button>
          )}

          {/* Search Dropdown Results */}
          {showDropdown && search.trim() && (
            <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-gray-100 animate-in fade-in duration-150">
              {isFetching ? (
                <div className="p-4 text-center text-xs text-gray-400 font-medium">
                  Searching catalog...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="max-h-80 overflow-y-auto p-1.5 space-y-1">
                  {searchResults.map((app) => {
                    const slug = app.name ? app.name.toLowerCase().replace(/\s+/g, '-') : '';
                    return (
                      <Link
                        href={`/app/${encodeURIComponent(slug)}`}
                        key={app._id}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition group"
                        onClick={() => {
                          setShowDropdown(false);
                          setShowSearchInput(false);
                          setSearch('');
                        }}
                      >
                        <img 
                          src={app.icon} 
                          alt={app.name} 
                          className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-gray-800 group-hover:text-blue-600 truncate transition">
                            {app.name}
                          </p>
                          <span className="inline-block text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded mt-0.5">
                            {app.category}
                          </span>
                        </div>
                        <HiChevronRight className="size-4 text-gray-300 group-hover:text-blue-500" />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-gray-400 font-medium">
                  No applications or games found
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full transition focus:outline-none" 
            onClick={() => setMobileMenu((prev) => !prev)} 
            aria-label="Toggle Navigation"
          >
            {mobileMenu ? <HiX className="size-6" /> : <HiMenu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2 shadow-lg">
          <Link 
            href="/apps" 
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
              isAppsActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
            }`} 
            onClick={() => setMobileMenu(false)}
          >
            <HiOutlineViewGrid className="size-5 text-gray-500" /> Apps
          </Link>
          
          <Link 
            href="/games" 
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
              isGamesActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
            }`} 
            onClick={() => setMobileMenu(false)}
          >
            <HiOutlinePuzzle className="size-5 text-gray-500" /> Games
          </Link>

          {isAdminRoute && typeof window !== 'undefined' && localStorage.getItem('apkpac_admin_token') && (
            <button 
              onClick={() => {
                setMobileMenu(false);
                handleLogout();
              }} 
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
            >
              <HiLogout className="size-5" /> Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;