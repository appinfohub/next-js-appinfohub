import React from "react";
import Link from "next/link";
import { useGetAppsQuery } from '../services/api';
import AdsSection from '../components/AdsSection';

const TopAppsPage = () => {
  const { data, isLoading } = useGetAppsQuery();
  const apps = data?.apps || [];
  // Filter apps by direct category field 'Top Apps' (case-insensitive)
  const topApps = apps.filter(app => (app.category || '').toLowerCase().includes('top apps'));

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 mb-8 px-4">
      <div className="mb-8">
        <AdsSection />
      </div>
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Top Apps</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-2 text-center text-gray-500">Loading...</div>
        ) : topApps.map((app, idx) => {
          // Extract category from description1 table for display
          let categoryValue = app.category;
          if (app.description1) {
            const match = app.description1.match(/<td[^>]*>\s*Category\s*<\/td>\s*<td[^>]*>(.*?)<\/td>/i);
            if (match) categoryValue = match[1];
          }
          return (
            <Link
              to={`/apps/${encodeURIComponent(app.name.toLowerCase().replace(/\s+/g, '-'))}`}
              key={app._id}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition border border-gray-100 flex items-center gap-4 cursor-pointer no-underline"
              style={{ textDecoration: 'none' }}
            >
              <img src={app.icon} alt={app.name} className="w-20 h-20 rounded-xl object-cover border border-gray-200 bg-gray-100" loading="lazy" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-xl text-gray-800 truncate block mb-1">
                  {idx + 1}. {app.name}
                </span>
                <span className="inline-block px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700 font-medium mb-2">
                  {categoryValue}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-yellow-500 font-bold text-xl">★</span>
                  <span className="text-gray-700 text-base font-medium">{app.rating}</span>
                  {app.downloads && (
                    <span className="ml-2 px-2 py-0.5 text-xs rounded bg-green-100 text-green-700 font-medium">{app.downloads} downloads</span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopAppsPage;

