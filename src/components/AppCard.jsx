import React from 'react';
import { FaStar } from 'react-icons/fa';
import Link from "next/link";
import { optimizeCloudinaryURL } from '../utils/cloudinaryOptimizer';

const AppCard = ({ app, idx }) => {
  // Extract category from description1 table
  let categoryValue = app.category;
  if (app.description1) {
    const match = app.description1.match(/<td[^>]*>\s*Category\s*<\/td>\s*<td[^>]*>(.*?)<\/td>/i);
    if (match) categoryValue = match[1];
  }
  // Slugify app name for details page
  const slug = app.name ? app.name.toLowerCase().replace(/\s+/g, '-') : '';
  // Optimize icon: displayed at 48-56px, fetch at w_100 (2x for retina)
  const iconSrc = optimizeCloudinaryURL(app.icon, 100);
  
  return (
    <Link href={`/app/${encodeURIComponent(slug)}`} className="block group" style={{ textDecoration: 'none' }}>
      <div className="bg-white rounded-lg md:rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group-hover:border-indigo-400 p-3 md:p-4 h-full">
        <div className="flex items-start gap-2 md:gap-4">
          {/* Icon - responsive size */}
          <img 
            src={iconSrc} 
            alt={app.name} 
            className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl object-cover border border-gray-200 bg-gray-100 shrink-0"
            loading="lazy"
            width="56"
            height="56"
          />
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title with number */}
            <h3 className="font-semibold text-sm md:text-lg text-gray-800 truncate mb-1">
              <span className="text-indigo-600">#{idx + 1}</span> {app.name}
            </h3>
            
            {/* Category Badge */}
            <span className="inline-block px-1.5 md:px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700 font-medium mb-1.5 truncate max-w-30">
              {categoryValue}
            </span>
            
            {/* Rating and Downloads Row */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-500 text-sm" />
                <span className="text-gray-700 text-xs md:text-sm font-semibold">{app.rating}</span>
              </div>
              
              {app.downloads && (
                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium whitespace-nowrap">
                  {app.downloads}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AppCard;
