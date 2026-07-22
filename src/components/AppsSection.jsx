'use client';

import React from 'react';
import Link from 'next/link';
import AppCard from './AppCard';
import { useGetAppsQuery } from '../services/api';

const parseDownloads = (value = '') => {
  const cleaned = String(value).toUpperCase().replace(/[^0-9KM+.]/g, '');
  if (cleaned.includes('M')) return parseFloat(cleaned) * 1000000;
  if (cleaned.includes('K')) return parseFloat(cleaned) * 1000;
  return parseFloat(cleaned) || 0;
};

const AppsSection = () => {
  const categoryLimit = 12;
  const { data, isLoading } = useGetAppsQuery({ page: 1, limit: 100, sortBy: 'downloads', sortOrder: 'desc' });

  const apps = React.useMemo(() => {
    const list = Array.isArray(data?.apps) ? [...data.apps] : [];
    return list
      .sort((a, b) => {
        const downloadsA = parseDownloads(a.downloads);
        const downloadsB = parseDownloads(b.downloads);
        if (downloadsB !== downloadsA) return downloadsB - downloadsA;
        const ratingA = Number(a.rating) || 0;
        const ratingB = Number(b.rating) || 0;
        return ratingB - ratingA;
      })
      .slice(0, categoryLimit);
  }, [data]);

  return (
    <section className="w-full max-w-7xl mx-auto my-10 px-4 font-sans">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
          Top Apps
        </h2>
        <Link href="/apps" className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition">
          Show All Apps
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-6">
        {isLoading ? (
          <div className="col-span-full py-10 text-center text-gray-400 font-medium text-sm">
            Loading top apps...
          </div>
        ) : (
          apps.map((app, idx) => (
            <AppCard key={app._id || idx} app={app} index={idx + 1} />
          ))
        )}
      </div>
    </section>
  );
};

export default AppsSection;
