'use client';

import React from 'react';
import Link from 'next/link';
import { useGetAppsQuery } from '../services/api';
import { useSelector } from 'react-redux';

function slugify(text = '') {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const HomeAppSection = ({ category = 'Windows', batchApps }) => {
  const allApps = useSelector((state) => state.apps.allApps);
  const categoryLimit = 12; // Strictly set to 12 apps

  // Filter cached apps up to 12 items
  const cachedApps = React.useMemo(() => {
    if (batchApps && batchApps.length >= categoryLimit) return batchApps.slice(0, categoryLimit);
    if (!allApps || allApps.length === 0) return null;
    const cat = category.toLowerCase();
    return allApps
      .filter((a) => {
        const appCat = a.category?.toLowerCase() || '';
        return appCat.includes(cat) || cat.includes(appCat) || appCat === cat;
      })
      .slice(0, categoryLimit);
  }, [allApps, category, batchApps]);

  // Strictly check if we have 12 items available in batch or cache
  const hasSufficientCache = (cachedApps?.length || 0) >= categoryLimit;

  // Fallback API call asking specifically for 12 items
  const { data, isLoading } = useGetAppsQuery(
    { page: 1, limit: categoryLimit, category },
    { skip: hasSufficientCache }
  );

  // Derive final array of 12 apps
  const apps = hasSufficientCache
    ? cachedApps
    : (data?.apps && data.apps.length > 0)
    ? data.apps.slice(0, categoryLimit)
    : (batchApps || []);

  const formattedCategoryTitle = category
    ? category
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim()
    : 'Windows';

  return (
    <section className="w-full max-w-7xl mx-auto my-8 px-4 font-sans">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
          Top Downloads for {formattedCategoryTitle}
        </h2>
      </div>

      {/* Grid: Compact 6 columns with smaller gap */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-5">
        {!hasSufficientCache && isLoading ? (
          <div className="col-span-full py-8 text-center text-gray-400 font-medium text-sm">
            Loading apps...
          </div>
        ) : (
          apps.slice(0, categoryLimit).map((app, idx) => {
            const appSlug = app.slug || slugify(app.name || '');
            const isGame = (app.category || '').toLowerCase().includes('game');
            const routeBase = isGame ? '/game' : '/app';

            return (
              <Link
                key={app._id || appSlug || idx}
                href={`${routeBase}/${appSlug}`}
                className="group flex flex-col items-start cursor-pointer w-full max-w-[140px] mx-auto"
              >
                {/* Reduced Square Icon Container */}
                <div className="w-full aspect-square rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-200">
                  <img
                    src={app.icon || '/placeholder.png'}
                    alt={app.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Info Section - Smaller typography */}
                <h3 className="mt-2 text-xs md:text-[13px] font-bold text-gray-900 truncate w-full group-hover:text-blue-600 transition-colors">
                  {app.name}
                </h3>
                <p className="text-[11px] text-gray-400 truncate w-full mt-0.5">
                  for {formattedCategoryTitle}
                </p>
                <div className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-0.5">
                  <span>{app.rating ? Number(app.rating).toFixed(1) : '4.5'}</span>
                  <span className="text-gray-400">★</span>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
};

export default HomeAppSection;