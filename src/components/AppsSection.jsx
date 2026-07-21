'use client';

import React from 'react';
import Link from 'next/link';
import AppCard from './AppCard';
import { useGetAppsQuery } from '../services/api';
import { useSelector } from 'react-redux';

const AppsSection = ({ category, batchApps }) => {
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
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());

  return (
    <section className="w-full max-w-7xl mx-auto my-10 px-4 font-sans">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
          {formattedCategoryTitle}
        </h2>
        <Link
          href={`/apps/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}`}
          className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition"
        >
          Show All {formattedCategoryTitle}
        </Link>
      </div>

      {/* Grid: 4 items per row x 3 rows = 12 Items Total */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-6">
        {!hasSufficientCache && isLoading ? (
          <div className="col-span-full py-10 text-center text-gray-400 font-medium text-sm">
            Loading apps...
          </div>
        ) : (
          apps.slice(0, categoryLimit).map((app, idx) => (
            <AppCard key={app._id || idx} app={app} index={idx + 1} />
          ))
        )}
      </div>
    </section>
  );
};

export default AppsSection;