import React, { useState } from "react";
import { useGetAppsQuery } from '../services/api';
import AdsSection from '../components/AdsSection';
import AppCard from '../components/AppCard';

const DesktopAppsPage = () => {
  const [page, setPage] = useState(0);
  const limit = 10;
  const { data, isLoading, isFetching } = useGetAppsQuery({ category: "Desktop", limit, skip: page * limit });
  const apps = data?.apps || [];
  const total = data?.total || 0;
  const canLoadMore = (page + 1) * limit < total;

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 mb-8 px-4">
      <div className="mb-8">
        <AdsSection />
      </div>
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Desktop Apps</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(isLoading || isFetching) && apps.length === 0 ? (
          Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-xl col-span-1 md:col-span-1" />
          ))
        ) : (
          apps.map((app, idx) => (
            <AppCard app={app} idx={page * limit + idx} key={app._id} />
          ))
        )}
      </div>
      {canLoadMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow hover:scale-105 transition disabled:opacity-50"
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DesktopAppsPage;

