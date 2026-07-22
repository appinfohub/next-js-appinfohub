'use client';

import React from 'react';
import Link from 'next/link';
import { useGetCategoriesQuery, useGetAppsQuery } from '../services/api';
import { 
  FaComments, 
  FaUsers, 
  FaTv, 
  FaMusic, 
  FaNewspaper, 
  FaWallet, 
  FaShoppingBag, 
  FaMapMarkedAlt, 
  FaWrench, 
  FaUtensils, 
  FaMobileAlt, 
  FaCloudSun,
  FaFolder
} from 'react-icons/fa';

// Map icons to categories
const CATEGORY_ICONS = {
  'Communication': FaComments,
  'Social': FaUsers,
  'Entertainment': FaTv,
  'Music & Audio': FaMusic,
  'News & Magazines': FaNewspaper,
  'Finance': FaWallet,
  'Shopping': FaShoppingBag,
  'Maps & Navigation': FaMapMarkedAlt,
  'Tools': FaWrench,
  'Food & Drink': FaUtensils,
  'Personalization': FaMobileAlt,
  'Weather': FaCloudSun,
};

const DEFAULT_TOP_CATEGORIES = [
  'Communication',
  'Social',
  'Entertainment',
  'Music & Audio',
  'News & Magazines',
  'Finance',
  'Shopping',
  'Maps & Navigation',
  'Tools',
  'Food & Drink',
  'Personalization',
  'Weather',
];

function slugify(name = '') {
  return name
    .toLowerCase()
    .replace(/&/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function CategoriesSection() {
  const { data, isLoading, error } = useGetCategoriesQuery();
  const { data: appsData } = useGetAppsQuery({ page: 1, limit: 500 });

  // Normalize API response to an array of names from categories endpoint
  const apiCategories = React.useMemo(() => {
    if (!data) return null;
    const list = Array.isArray(data) ? data : data.categories || [];
    return list
      .map((c) => (typeof c === 'string' ? { name: c } : { name: c.name || c.title || '' }))
      .filter((c) => c.name && c.name.trim().length > 0);
  }, [data]);

  // Fallback: derive categories from apps data when categories endpoint is empty
  const appDerivedCategories = React.useMemo(() => {
    const apps = appsData?.apps || appsData || [];
    const set = new Set();
    for (const a of apps) {
      if (a?.category) set.add(String(a.category).trim());
    }
    return Array.from(set);
  }, [appsData]);

  const categories = React.useMemo(() => {
    const source = (apiCategories && apiCategories.length > 0)
      ? apiCategories.map((c) => c.name)
      : (appDerivedCategories && appDerivedCategories.length > 0)
        ? appDerivedCategories
        : DEFAULT_TOP_CATEGORIES;

    const uniq = [];
    for (const name of source) {
      if (!uniq.includes(name)) uniq.push(name);
      if (uniq.length >= 12) break;
    }
    return uniq;
  }, [apiCategories, appDerivedCategories]);

  return (
    <section className="w-full max-w-7xl mx-auto my-8 px-4 font-sans">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">Categories</h2>
       
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-gray-400">Loading categories...</div>
      ) : error ? (
        <div className="py-8 text-center text-red-500">Failed to load categories.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((name) => {
            const IconComponent = CATEGORY_ICONS[name] || FaFolder;
            const categorySlug = slugify(name);

            return (
              <Link
                key={name}
                href={`/${categorySlug}`}
                className="relative overflow-hidden flex flex-col justify-between p-4 h-28 bg-[#e8f1fd] rounded-2xl border border-blue-100 hover:shadow-md transition-transform duration-200 hover:-translate-y-0.5 group"
              >
                {/* Top-Left White Circle Icon Box */}
                <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 text-base z-10">
                  <IconComponent />
                </div>

                {/* Category Label */}
                <div className="text-sm font-bold text-blue-600 truncate z-10 mt-2">
                  {name}
                </div>

                {/* Faded Background Watermark Icon */}
                <div className="absolute -right-2 -top-2 text-blue-200/50 pointer-events-none group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-20 h-20" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default CategoriesSection;