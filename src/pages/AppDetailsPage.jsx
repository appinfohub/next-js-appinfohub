'use client';

import React, { useMemo, useRef } from "react";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useGetAppsQuery, useGetAppBySlugQuery } from "../services/api";
import DownloadButtons from "../components/DownloadButtons";
import AppCard from '../components/AppCard';
import { FaChevronLeft, FaChevronRight, FaDownload } from 'react-icons/fa';
import { FaTag, FaCodeBranch, FaCalendarAlt, FaUserTie, FaShieldAlt, FaDollarSign } from 'react-icons/fa';
import { HiStar } from 'react-icons/hi';
import { BsShieldCheck } from "react-icons/bs";

const AppDetailsPage = ({ slug: rawSlug }) => {
  const slug = rawSlug ? String(rawSlug).toLowerCase() : '';

  // Get O(1) slug lookup map from Redux store
  const appsBySlug = useSelector((state) => state.apps.appsBySlug);
  const scrollerRef = useRef(null);

  // Synchronous cache lookup
  const cachedApp = useMemo(() => {
    return appsBySlug?.[slug] || null;
  }, [appsBySlug, slug]);

  // Fetch from backend if NOT found in cache
  const { data: appFromBackend, isLoading: backendLoading, error: backendError } = useGetAppBySlugQuery(slug, {
    skip: !slug || !!cachedApp,
    refetchOnFocus: false,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: false,
  });

  const app = cachedApp || appFromBackend;
  const isLoading = !cachedApp && backendLoading;
  const error = !cachedApp && backendError;

  // Extract category from description1 table if available
  let desc1Category = undefined;
  if (app) {
    desc1Category = app.category;
    if (app.description1) {
      const match = app.description1.match(/<td[^>]*>\s*Category\s*<\/td>\s*<td[^>]*>(.*?)<\/td>/i);
      if (match) desc1Category = match[1];
    }
  }

  const reduxAllApps = useSelector((state) => state.apps.allApps);

  const cachedSimilarApps = useMemo(() => {
    if (!desc1Category || !reduxAllApps || reduxAllApps.length === 0) return null;
    const cat = desc1Category.toLowerCase();
    return reduxAllApps
      .filter(a => {
        if (app && a._id === app._id) return false;
        const appCat = a.category?.toLowerCase() || '';
        if (appCat.includes(cat) || cat.includes(appCat) || appCat === cat) return true;
        if (a.description1) {
          const m = a.description1.match(/<td[^>]*>\s*Category\s*<\/td>\s*<td[^>]*>(.*?)<\/td>/i);
          if (m) {
            const descCat = m[1].toLowerCase();
            if (descCat.includes(cat) || cat.includes(descCat) || descCat === cat) return true;
          }
        }
        return false;
      })
      .slice(0, 12);
  }, [reduxAllApps, desc1Category, app]);

  const { data: similarData } = useGetAppsQuery(
    { category: desc1Category, limit: 12 },
    {
      skip: !desc1Category || (cachedSimilarApps && cachedSimilarApps.length > 0),
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false,
    }
  );

  const desc1MatchedApps = (cachedSimilarApps && cachedSimilarApps.length > 0)
    ? cachedSimilarApps
    : (similarData?.apps || []).filter(a => app && a._id !== app._id);

  const { data: trendingData, isLoading: loadingTrending } = useGetAppsQuery(
    { page: 1, limit: 15, sortBy: 'downloads', sortOrder: 'desc' },
    {
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false,
    }
  );

  const trendingApps = useMemo(() => {
    if (!trendingData?.apps) return [];
    return trendingData.apps.filter((a) => app && a._id !== app._id).slice(0, 10);
  }, [trendingData, app]);

  if (!slug) return <div className="p-8 text-center text-lg font-medium">Loading details...</div>;

  if (isLoading) return (
    <div className="max-w-6xl mx-auto px-4 mt-8 mb-12 animate-pulse">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-3">
              <div className="h-9 w-72 bg-gray-200 rounded" />
              <div className="h-4 w-36 bg-gray-200 rounded" />
            </div>
            <div className="w-24 h-24 bg-gray-200 rounded-2xl" />
          </div>
          <div className="h-64 bg-gray-200 rounded-2xl mb-6" />
        </div>
        <div className="w-full lg:w-80 flex-shrink-0 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-14 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );

  if (error || !app) return <div className="p-8 text-center text-lg font-semibold">App not found.</div>;

  const currentCategoryName = (() => {
    let categoryValue = app.category;
    if (app.description1) {
      const match = app.description1.match(/<td[^>]*>\s*Category\s*<\/td>\s*<td[^>]*>(.*?)<\/td>/i);
      if (match) categoryValue = match[1];
    }
    return categoryValue || 'App';
  })();

  const categorySlug = currentCategoryName.toLowerCase().trim().replace(/\s+/g, '-');

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6 mb-16 font-sans text-gray-900">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">

          {/* Header Info Section */}
          <div className="flex justify-between items-start gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 mb-2 leading-tight">
                {app.name}
              </h1>

              {/* Category Link */}
              <Link href={`/${categorySlug}`} className="text-blue-600 font-medium hover:underline text-base inline-block mb-4">
                {currentCategoryName}
              </Link>

              {/* Stats Bar */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div>
                  <div className="font-bold text-gray-900 text-base">{app.rating || '4.5'}</div>
                  <div className="text-xs text-gray-500">{app.votes || '2.42K'}</div>
                </div>
                <div className="h-8 w-px bg-gray-200" />
                <div>
                  <div className="font-bold text-gray-900 text-base">{app.downloads || '10M+'}</div>
                  <div className="text-xs text-gray-500">Installs</div>
                </div>
                <div className="h-8 w-px bg-gray-200" />
                <div className="flex items-center gap-2">
                 
                  <div>
                    <div className="font-bold text-gray-900 text-base leading-none">
                      Varies with device
                    </div>
                    <div className="text-xs text-gray-500 leading-none mt-1">
                      Version
                    </div>
                  </div>
                   <BsShieldCheck className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>

            <img
              src={app.icon}
              alt={app.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-sm flex-shrink-0"
            />
          </div>

          {/* Screenshots Gallery Container */}
          {Array.isArray(app?.images) && app.images.length > 0 && (
            <div className="relative group my-8">
              <div
                ref={scrollerRef}
                className="flex items-center gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar pb-2"
              >
                {app.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="snap-start flex-shrink-0 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50"
                  >
                    <img
                      src={img}
                      alt={`Screenshot ${idx + 1}`}
                      className="h-64 sm:h-72 w-auto object-cover rounded-2xl"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                type="button"
                aria-label="Scroll left"
                className="absolute left-1 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 p-3 text-gray-700 shadow-md border border-gray-200 hover:bg-white transition-opacity"
                onClick={() => scrollerRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
              >
                <FaChevronLeft className="text-sm" />
              </button>

              <button
                type="button"
                aria-label="Scroll right"
                className="absolute right-1 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 p-3 text-gray-700 shadow-md border border-gray-200 hover:bg-white transition-opacity"
                onClick={() => scrollerRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
              >
                <FaChevronRight className="text-sm" />
              </button>
            </div>
          )}

           {/* Table Specifications */}
          {/* {app.description1 && (
            <div className="my-8 overflow-x-auto">
              <div className="w-full rounded-2xl border border-gray-100 bg-white p-2">
                <table className="w-full text-sm text-gray-800 border-collapse">
                  <tbody>
                    {(() => {
                      const rows = [];
                      const regex = /<tr[^>]*>(.*?)<\/tr>/gi;
                      let match;
                      while ((match = regex.exec(app.description1))) {
                        const cells = match[1].match(/<td[^>]*>(.*?)<\/td>/g);
                        if (cells && cells.length === 2) {
                          const key = cells[0].replace(/<td[^>]*>|<\/td>/g, '').trim();
                          const value = cells[1].replace(/<td[^>]*>|<\/td>/g, '').trim();
                          let icon = null;
                          if (/category/i.test(key)) icon = <FaTag className="inline mr-2 text-blue-500" />;
                          else if (/latest version/i.test(key)) icon = <FaCodeBranch className="inline mr-2 text-purple-500" />;
                          else if (/publish date/i.test(key)) icon = <FaCalendarAlt className="inline mr-2 text-green-500" />;
                          else if (/developer/i.test(key)) icon = <FaUserTie className="inline mr-2 text-indigo-500" />;
                          else if (/security/i.test(key)) icon = <FaShieldAlt className="inline mr-2 text-yellow-500" />;
                          else if (/price/i.test(key)) icon = <FaDollarSign className="inline mr-2 text-gray-500" />;

                          rows.push(
                            <tr className="border-b border-gray-100 last:border-b-0" key={key}>
                              <td className="py-3 px-3 font-semibold w-40 text-gray-700">{icon}{key}</td>
                              <td className="py-3 px-3 text-gray-600">{value}</td>
                            </tr>
                          );
                        }
                      }
                      return rows;
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          )}  */}

          {/* Descriptions */}
          {app.description2 && (
            <div className="my-8">
              <h2 className="text-xl font-bold mb-3">Features of {app.name}</h2>
              <div className="prose prose-gray max-w-none text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: app.description2 }} />
            </div>
          )}

          {app.description3 && (
            <div className="my-8">
              <div className="prose prose-gray max-w-none text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: app.description3 }} />
            </div>
          )}

          {/* Download Buttons component */}
          <div className="my-8">
            <DownloadButtons
              playUrl={app.playStoreUrl}
              appStoreUrl={app.appStoreUrl}
              isDesktop={(() => {
                let isDesktop = false;
                let cat1 = (app.category || '').toLowerCase();
                let cat2 = '';
                if (app.description1) {
                  const match = app.description1.match(/<td[^>]*>\s*Category\s*<\/td>\s*<td[^>]*>(.*?)<\/td>/i);
                  if (match) cat2 = match[1].toLowerCase();
                }
                if (cat1.includes('desktop') || cat1.includes('windows') || cat2.includes('desktop') || cat2.includes('windows')) isDesktop = true;
                return isDesktop;
              })()}
            />
          </div>

          {/* You May Like Grid Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Like</h2>
            {desc1MatchedApps.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-6">
                {desc1MatchedApps.map((a, idx) => {
                  const slug = a.name ? a.name.toLowerCase().replace(/\s+/g, '-') : '';
                  return (
                    <Link
                      key={a._id || idx}
                      href={`/app/${encodeURIComponent(slug)}`}
                      className="group flex flex-col items-start text-left transition-transform duration-150 hover:-translate-y-1"
                    >
                      {/* App Icon */}
                      <div className="w-full aspect-square rounded-[22%] overflow-hidden bg-gray-100 mb-2 shadow-sm border border-gray-100/60">
                        <img
                          src={a.icon || '/placeholder.png'}
                          alt={a.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>

                      {/* App Name */}
                      <h3 className="w-full text-sm font-semibold text-gray-900 truncate leading-tight group-hover:text-blue-600 transition-colors">
                        {a.name}
                      </h3>

                      {/* Category */}
                      <p className="text-xs text-gray-500 mt-0.5 truncate w-full">
                        {a.category || 'Casual'}
                      </p>

                      {/* Rating & Star */}
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-600 font-medium">
                        <span>{a.rating ? Number(a.rating).toFixed(1) : '4.5'}</span>
                        <HiStar className="size-3.5 text-gray-500" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No related items found.</p>
            )}
          </div>
        </div>

        {/* Sidebar Ranking Area */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Trending
          </h2>

          <div className="flex flex-col gap-4">
            {loadingTrending ? (
              <div className="text-sm text-gray-500">Loading ranking list...</div>
            ) : (
              trendingApps.map((item, index) => {
                const itemSlug = item.slug || item.name?.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

                return (
                  <Link
                    key={item._id || index}
                    href={`/${itemSlug}`}
                    className="flex items-center gap-3 py-1.5 px-2 hover:bg-gray-50 rounded-xl transition-colors group cursor-pointer"
                  >
                    <span className="text-gray-400 font-semibold text-sm w-4 text-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover bg-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 truncate leading-tight group-hover:text-blue-600">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {item.category || 'App'} <span className="text-gray-400">★ {item.rating || '4.5'}</span>
                      </p>
                    </div>
                    <div className="p-2 text-gray-400 group-hover:text-gray-700 bg-gray-50 group-hover:bg-gray-100 rounded-lg flex-shrink-0 transition-colors">
                      <FaDownload className="text-xs" />
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AppDetailsPage;