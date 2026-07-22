'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useGetAppsQuery } from '../../../services/api'; // Adjust path if needed
import { HiDownload, HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import AdsSection from '../../../components/AdsSection'; // Adjust path if needed
import { filterAppsByType } from '../../../utils/categoryTypeFilters';

// --- List of Valid Game Categories ---
const GAME_CATEGORIES = new Set([
  'Action',
  'Adventure',
  'Board',
  'Card',
  'Casual',
  'Demo',
  'Music',
  'Puzzle',
  'Role Playing',
  'Sports',
  'Word',
  'Arcade',
  'Racing',
  'Simulation',
  'Strategy',
  'Educational',
  'Casino',
]);

// Helper: Convert Download String ('1M+', '500K', '1200') to Numeric Value
const parseDownloads = (str = '') => {
  if (!str) return 0;
  const clean = str.toString().toUpperCase().replace(/[^0-9KM+.]/g, '');
  if (clean.includes('M')) return parseFloat(clean) * 1000000;
  if (clean.includes('K')) return parseFloat(clean) * 1000;
  return parseFloat(clean) || 0;
};

// Main Grid Game Card Component
const MainGridGameCard = ({ game }) => {
  const slug = game.name ? game.name.toLowerCase().replace(/\s+/g, '-') : '';

  return (
    <div className="flex flex-col items-start group cursor-pointer w-full">
      <Link href={`/game/${encodeURIComponent(slug)}`} className="w-full aspect-square relative mb-2">
        <img
          src={game.icon || '/placeholder.png'}
          alt={game.name}
          className="w-full h-full rounded-2xl md:rounded-[22px] object-cover border border-gray-100 shadow-xs bg-gray-50 group-hover:scale-[1.02] transition-transform duration-200"
        />
      </Link>

      <div className="w-full flex flex-col min-w-0">
        <Link href={`/game/${encodeURIComponent(slug)}`} className="w-full">
          <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-blue-600 truncate transition leading-snug">
            {game.name}
          </h3>
        </Link>

        <p className="text-[11px] text-gray-400 truncate w-full mt-0.5">
          {game.category || 'Game'}
        </p>

        <div className="flex items-center gap-0.5 text-[11px] font-semibold text-gray-500 mt-0.5">
          <span>{game.rating ? Number(game.rating).toFixed(1) : '4.5'}</span>
          <HiStar className="size-3 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

// Sidebar Top Downloaded Game Card Component
const TopSidebarCard = ({ game, rank }) => {
  const slug = game.name ? game.name.toLowerCase().replace(/\s+/g, '-') : '';

  return (
    <div className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-50 transition duration-150 group">
      <span className="w-5 text-right font-semibold text-xs sm:text-sm text-gray-300 shrink-0">
        {rank}
      </span>

      <Link href={`/game/${encodeURIComponent(slug)}`} className="shrink-0">
        <img
          src={game.icon || '/placeholder.png'}
          alt={game.name}
          className="w-12 h-12 rounded-2xl object-cover border border-gray-100 shadow-xs bg-gray-50"
        />
      </Link>

      <div className="flex-1 min-w-0 pr-1">
        <Link href={`/game/${encodeURIComponent(slug)}`}>
          <h4 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-blue-600 truncate transition leading-snug">
            {game.name}
          </h4>
        </Link>

        <div className="flex items-center justify-between text-[11px] text-gray-400 mt-0.5">
          <span className="truncate max-w-[85px]">{game.category || 'Game'}</span>

          <div className="flex items-center gap-0.5 font-semibold text-gray-600 shrink-0 ml-1">
            <span>{game.rating ? Number(game.rating).toFixed(1) : '4.5'}</span>
            <HiStar className="size-3 text-gray-400" />
          </div>
        </div>
      </div>

      <Link
        href={`/game/${encodeURIComponent(slug)}`}
        className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg shrink-0 transition"
        aria-label={`Download ${game.name}`}
      >
        <HiDownload className="size-3.5" />
      </Link>
    </div>
  );
};

export default function GamesPageClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const mainGamesLimit = 42; // 42 games per page
  const topGamesLimit = 20;  // Top 20 sidebar items

  // Fetch API items
  const { data: rawMainData, isLoading: isMainLoading } = useGetAppsQuery({
    page: currentPage,
    limit: mainGamesLimit,
    type: 'game',
  });

  const { data: rawTopData, isLoading: isTopLoading } = useGetAppsQuery({
    page: 1,
    limit: 100,
    type: 'game',
    sortBy: 'downloads',
    sortOrder: 'desc',
  });


  const filteredMainGames = useMemo(() => {
    const rawList = rawMainData?.games || rawMainData?.apps || rawMainData?.data || [];
    return filterAppsByType(rawList, 'game').slice(0, mainGamesLimit);
  }, [rawMainData]);

  // Filter & sort sidebar trending items exclusively for game categories
  const sortedTopGames = useMemo(() => {
    const rawList = rawTopData?.games || rawTopData?.apps || rawTopData?.data || [];
    return [...filterAppsByType(rawList, 'game')]
      .sort((a, b) => parseDownloads(b.downloads) - parseDownloads(a.downloads))
      .slice(0, topGamesLimit);
  }, [rawTopData]);

  const totalPages = rawMainData?.totalPages || 158;

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
      {/* Top Ads Banner */}
      <div className="mb-8">
        <AdsSection />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT MAIN GRID SECTION */}
        <section className="lg:col-span-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-6">
            Games
          </h1>

          {isMainLoading ? (
            <div className="py-24 text-center text-gray-400 font-medium text-sm">
              Loading games catalog...
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-6">
              {filteredMainGames.map((game) => (
                <MainGridGameCard key={game._id || game.id} game={game} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center gap-2 mt-10 mb-8 select-none">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl disabled:opacity-40 transition"
            >
              <HiChevronLeft className="size-4" /> Prev
            </button>

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

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl disabled:opacity-40 transition"
            >
              Next <HiChevronRight className="size-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 pt-4 border-t border-gray-100">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-gray-900 font-semibold">Games</span>
          </div>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside className="lg:col-span-4 pl-0 lg:pl-4">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mb-4">
            Trending Games
          </h2>

          {isTopLoading ? (
            <div className="py-12 text-center text-gray-400 text-xs">
              Loading trending games...
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {sortedTopGames.map((game, index) => (
                <TopSidebarCard key={game._id || game.id} game={game} rank={index + 1} />
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}