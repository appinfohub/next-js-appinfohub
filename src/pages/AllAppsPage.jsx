'use client';

import React from "react";
import { useParams } from 'next/navigation';
import { useGetAppsQuery } from '../services/api';
import AdsSection from '../components/AdsSection';
import AppCard from '../components/AppCard';

const categoryMap = {
  "top-apps": "top app",
  "desktop": "desktop",
  "popular-apps": "popular",
  "games": "game",
  "finance": "finance",
  "tools": "tool",
  "entertainment": "entertainment",
  "business": "business",
};

const AllAppsPage = () => {
  const params = useParams();

  const slug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug || '';

  const categoryKey = categoryMap[slug] || slug;

  // Fetch all apps
  const { data, isLoading, error } = useGetAppsQuery({
    page: 1,
    limit: 10000,
    category: categoryKey,
  });

  const apps = data?.apps || [];

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 mb-8 px-4">
      
      <div className="mb-8">
        <AdsSection />
      </div>

      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        {slug
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase())} Apps
      </h2>

      {isLoading ? (
        <div className="text-center text-gray-500 py-10">
          Loading...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">
          Failed to load apps
        </div>
      ) : apps.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No apps found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apps.map((app, idx) => (
            <AppCard
              app={app}
              idx={idx}
              key={app._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAppsPage;