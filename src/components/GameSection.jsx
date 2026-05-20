'use client';

import React from "react";
import Link from "next/link";
import AppCard from "./AppCard";
import { useGetAppsQuery } from "../services/api";




const GameSection = ({ category }) => {
  // Always fetch only 9 items for this category
  const { data, isLoading } = useGetAppsQuery({ page: 1, limit: 9, category });
  const apps = data?.apps || [];

  return (
    <section className="w-full max-w-6xl mx-auto mt-10 mb-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{category}</h2>
        <Link
          href={`/apps/${category.toLowerCase()}`}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg font-bold shadow hover:scale-105 transition"
        >
          Show All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-3 text-center text-gray-500">Loading...</div>
        ) : apps.map((app, idx) => (
          <AppCard key={app._id} app={app} idx={idx} />
        ))}
      </div>
    </section>
  );
};

export default GameSection;

