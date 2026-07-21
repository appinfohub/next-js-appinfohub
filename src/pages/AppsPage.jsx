'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useGetAppsQuery } from '../services/api';
import { HiDownload, HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import AdsSection from '../components/AdsSection';
import { filterAppsByType } from '../utils/categoryTypeFilters';

// --- Helper: Convert Download String ('1M+', '500K', '1200') to Numeric Value ---
const parseDownloads = (str = '') => {
  if (!str) return 0;
  const clean = str.toString().toUpperCase().replace(/[^0-9KM+.]/g, '');
  if (clean.includes('M')) return parseFloat(clean) * 1000000;
  if (clean.includes('K')) return parseFloat(clean) * 1000;
  return parseFloat(clean) || 0;
};

// --- Main Grid App Card ---
const MainGridAppCard = ({ app }) => {
  const slug = app.name ? app.name.toLowerCase().replace(/\s+/g, '-') : '';

  return (
    <div className="flex flex-col items-start group cursor-pointer w-full">
      {/* Full-width Squircle Icon */}
      <Link href={`/app/${encodeURIComponent(slug)}`} className="w-full aspect-square relative mb-2">
        <img
          src={app.icon || '/placeholder.png'}
          alt={app.name}
          className="w-full h-full rounded-2xl md:rounded-[22px] object-cover border border-gray-100 shadow-xs bg-gray-50 group-hover:scale-[1.02] transition-transform duration-200"
        />
      </Link>

      {/* App Details */}
      <div className="w-full flex flex-col min-w-0">
        <Link href={`/app/${encodeURIComponent(slug)}`} className="w-full">
          <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-blue-600 truncate transition leading-snug">
            {app.name}
          </h3>
        </Link>

        <p className="text-[11px] text-gray-400 truncate w-full mt-0.5">
          {app.category || 'App'}
        </p>

        <div className="flex items-center gap-0.5 text-[11px] font-semibold text-gray-500 mt-0.5">
          <span>{app.rating ? Number(app.rating).toFixed(1) : '4.5'}</span>
          <HiStar className="size-3 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

// --- Sidebar Top Downloaded Card ---
const TopSidebarCard = ({ app, rank }) => {
  const slug = app.name ? app.name.toLowerCase().replace(/\s+/g, '-') : '';

  return (
    <div className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-50 transition duration-150 group">
      {/* Rank Number */}
      <span className="w-5 text-right font-semibold text-xs sm:text-sm text-gray-300 shrink-0">
        {rank}
      </span>

      {/* App Icon */}
      <Link href={`/app/${encodeURIComponent(slug)}`} className="shrink-0">
        <img
          src={app.icon || '/placeholder.png'}
          alt={app.name}
          className="w-12 h-12 rounded-2xl object-cover border border-gray-100 shadow-xs bg-gray-50"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 pr-1">
        <Link href={`/app/${encodeURIComponent(slug)}`}>
          <h4 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-blue-600 truncate transition leading-snug">
            {app.name}
          </h4>
        </Link>

        <div className="flex items-center justify-between text-[11px] text-gray-400 mt-0.5">
          <span className="truncate max-w-[85px]">{app.category || 'App'}</span>

          <div className="flex items-center gap-0.5 font-semibold text-gray-600 shrink-0 ml-1">
            <span>{app.rating ? Number(app.rating).toFixed(1) : '4.5'}</span>
            <HiStar className="size-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Download Icon Button */}
      <Link
        href={`/app/${encodeURIComponent(slug)}`}
        className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg shrink-0 transition"
        aria-label={`Download ${app.name}`}
      >
        <HiDownload className="size-3.5" />
      </Link>
    </div>
  );
};

// --- Main Page Component ---
const AppsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const mainAppsLimit = 42; // Increased by 18 (24 + 18 = 42 apps per page / 6 cols x 7 rows)
  const topAppsLimit = 20;  // 20 items in sidebar

  // Fetch Main Grid Apps
  const { data: mainData, isLoading: isMainLoading } = useGetAppsQuery({
    page: currentPage,
    limit: mainAppsLimit,
    type: 'app',
  });

  // Fetch Sidebar Top Downloads
  const { data: topData, isLoading: isTopLoading } = useGetAppsQuery({
    page: 1,
    limit: topAppsLimit * 2,
    type: 'app',
    sortBy: 'downloads',
    sortOrder: 'desc',
  });

  const mainApps = useMemo(() => {
    const list = mainData?.apps || [];
    return filterAppsByType(list, 'app');
  }, [mainData]);
  const totalPages = mainData?.totalPages || 158;

  // Client-side Sort for Sidebar Top Downloads
  const sortedTopApps = useMemo(() => {
    if (!topData?.apps) return [];
    return [...filterAppsByType(topData.apps, 'app')]
      .sort((a, b) => parseDownloads(b.downloads) - parseDownloads(a.downloads))
      .slice(0, topAppsLimit);
  }, [topData]);

  // Dynamic Pagination Array
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 2;
    let start = Math.max(1, currentPage);
    let end = Math.min(totalPages, start + maxVisible - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 font-sans">
      {/* Ad Section */}
      <div className="mb-8">
        <AdsSection />
      </div>

      {/* Page Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ================= LEFT MAIN GRID ================= */}
        <section className="lg:col-span-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-6">
            Apps
          </h1>

          {isMainLoading ? (
            <div className="py-24 text-center text-gray-400 font-medium text-sm">
              Loading apps...
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-6">
              {mainApps.map((app) => (
                <MainGridAppCard key={app._id} app={app} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex items-center gap-2 mt-10 mb-8 select-none">
            {/* Prev Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl disabled:opacity-40 transition"
            >
              <HiChevronLeft className="size-4" /> Prev
            </button>

            {/* Active Page Buttons */}
            {pageNumbers.map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`min-w-[36px] h-9 text-xs font-bold rounded-xl transition ${
                  currentPage === num
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {num}
              </button>
            ))}

            <span className="text-xs text-gray-400 px-1 font-medium">...</span>

            {/* Total Pages Button */}
            {!pageNumbers.includes(totalPages) && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`min-w-[42px] h-9 text-xs font-bold rounded-xl transition ${
                  currentPage === totalPages
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {totalPages}
              </button>
            )}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl disabled:opacity-40 transition"
            >
              Next <HiChevronRight className="size-4" />
            </button>
          </div>

          {/* Breadcrumb Footer Path */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 pt-4 border-t border-gray-100">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-gray-900 font-semibold">Apps</span>
          </div>
        </section>

        {/* ================= RIGHT SIDEBAR ================= */}
        <aside className="lg:col-span-4 pl-0 lg:pl-4">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mb-4">
            Trending Apps
          </h2>

          {isTopLoading ? (
            <div className="py-12 text-center text-gray-400 text-xs">
              Loading trending apps...
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {sortedTopApps.map((app, index) => (
                <TopSidebarCard key={app._id} app={app} rank={index + 1} />
              ))}
            </div>
          )}
        </aside>

      </div>
    </div>
  );
};

export default AppsPage;