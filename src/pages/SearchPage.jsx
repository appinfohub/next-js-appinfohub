import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useGetAppsQuery } from '../services/api';
import AppCard from '../components/AppCard';
import { HiOutlineSearch } from 'react-icons/hi';

const SearchPage = () => {
  const router = useRouter();
  const searchQuery = router.query.q;
  const query = Array.isArray(searchQuery) ? searchQuery[0] : (searchQuery || '');
  
  // Fetch apps with search query
  const { data, isLoading } = useGetAppsQuery({ 
    page: 1,
    limit: 100,
    search: query.trim()
  });
  
  const apps = data?.apps || [];

  // Get top 8 apps for suggestions (limit results)
  const appSuggestions = useMemo(() => {
    return apps.slice(0, 8);
  }, [apps]);

  return (
    <div className="container mx-auto py-6 px-4 min-h-screen">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Search Results for <span className="text-blue-600">"{query}"</span>
        </h1>
        <p className="text-gray-600">
          {isLoading ? 'Searching...' : `Found ${apps.length} app${apps.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Searching for apps...</p>
          </div>
        </div>
      ) : apps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Results - Left Side */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Search Results ({apps.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {apps.map((app, idx) => (
                <AppCard key={app._id} app={app} idx={idx} />
              ))}
            </div>
          </div>

          {/* App Suggestions - Right Side */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Top Suggestions</h2>
            <div className="space-y-3">
              {appSuggestions.map((app) => (
                <div
                  key={app._id}
                  onClick={() => {
                    const slug = app.name.toLowerCase().replace(/\s+/g, '-');
                    router.push(`/app/${encodeURIComponent(slug)}`);
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer"
                >
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-12 h-12 rounded-lg object-cover border bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{app.name}</p>
                    <p className="text-xs text-gray-500 truncate">{app.category}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium text-gray-700">{app.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <HiOutlineSearch className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No apps found</h3>
          <p className="text-gray-600 mb-6">We couldn't find any apps matching "<strong>{query}</strong>"</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

