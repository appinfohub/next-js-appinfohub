'use client';

import React from 'react';
import Link from 'next/link';
import { HiDownload, HiStar } from 'react-icons/hi';
import { isGameCategory } from '../utils/categoryTypeFilters';

const AppCard = ({ app, index }) => {
  const slug = app.name ? app.name.toLowerCase().replace(/\s+/g, '-') : '';
  const routeBase = isGameCategory(app.category) ? '/game' : '/app';

  return (
    <div className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-50/80 transition duration-150 group">
      {/* Index Rank Number */}
      <span className="w-4 text-right text-sm font-medium text-gray-300 shrink-0">
        {index}
      </span>

      {/* App Icon */}
      <Link href={`${routeBase}/${encodeURIComponent(slug)}`} className="shrink-0">
        <img
          src={app.icon || '/placeholder.png'}
          alt={app.name}
          className="w-12 h-12 rounded-2xl object-cover border border-gray-100 shadow-xs bg-gray-50"
        />
      </Link>

      {/* Title, Category & Star Rating */}
      <div className="flex-1 min-w-0">
        <Link href={`${routeBase}/${encodeURIComponent(slug)}`}>
          <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-blue-600 truncate transition leading-snug">
            {app.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between text-[11px] text-gray-400 mt-0.5">
          <span className="truncate max-w-[90px]">{app.category || 'App'}</span>
          
          <div className="flex items-center gap-0.5 font-semibold text-gray-600 shrink-0 ml-1">
            <span>{app.rating ? Number(app.rating).toFixed(1) : '4.5'}</span>
            <HiStar className="size-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Download Button Icon */}
      <Link
        href={`${routeBase}/${encodeURIComponent(slug)}`}
        className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg shrink-0 transition"
        aria-label={`Download ${app.name}`}
      >
        <HiDownload className="size-3.5" />
      </Link>
    </div>
  );
};

export default AppCard;