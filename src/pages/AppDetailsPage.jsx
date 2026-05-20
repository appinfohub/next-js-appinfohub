'use client';

import React, { useMemo } from "react";
import { useSelector } from 'react-redux';
import { useGetAppsQuery, useGetAppBySlugQuery } from "../services/api";
import AppsSection from "../components/AppsSection";
import AdsSection from "../components/AdsSection";

import RatingsBar from "../components/RatingsBar";
import DownloadButtons from "../components/DownloadButtons";

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaTag, FaCodeBranch, FaCalendarAlt, FaUserTie, FaShieldAlt, FaDollarSign } from 'react-icons/fa';
import AppCard from '../components/AppCard';

const AppDetailsPage = ({ slug: rawSlug }) => {
  const slug = rawSlug ? String(rawSlug).toLowerCase() : '';

  // Get O(1) slug lookup map from Redux store (populated by background fetch)
  const appsBySlug = useSelector((state) => state.apps.appsBySlug);

  // STEP 1: Synchronous cache lookup using useMemo (instant, no extra render)
  const cachedApp = useMemo(() => {
    return appsBySlug?.[slug] || null;
  }, [appsBySlug, slug]);

  // STEP 2: Only fetch from backend if NOT found in Redux cache and slug is available
  const { data: appFromBackend, isLoading: backendLoading, error: backendError } = useGetAppBySlugQuery(slug, {
    skip: !slug || !!cachedApp, // Skip if no slug or if found in cache
    refetchOnFocus: false,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: false,
  });

  // Use cache first, fall back to backend if needed
  const app = cachedApp || appFromBackend;
  const isLoading = !cachedApp && backendLoading;
  const error = !cachedApp && backendError;

  if (!slug) return <div className="p-8 text-center text-lg">Loading app details...</div>;

  // Get similar apps - try from cache first, then backend
  let desc1Category = undefined;
  if (app) {
    desc1Category = app.category;
    if (app.description1) {
      const match = app.description1.match(/<td[^>]*>\s*Category\s*<\/td>\s*<td[^>]*>(.*?)<\/td>/i);
      if (match) desc1Category = match[1];
    }
  }

  // Get all apps from Redux for similar apps (instant, no API call)
  const reduxAllApps = useSelector((state) => state.apps.allApps);

  // Try to get similar apps from Redux cache first, fall back to API
  const cachedSimilarApps = useMemo(() => {
    if (!desc1Category || !reduxAllApps || reduxAllApps.length === 0) return null;
    const cat = desc1Category.toLowerCase();
    return reduxAllApps
      .filter(a => {
        if (app && a._id === app._id) return false;
        // Check category field with partial match
        const appCat = a.category?.toLowerCase() || '';
        if (appCat.includes(cat) || cat.includes(appCat) || appCat === cat) return true;
        // Check description1 table category with partial match
        if (a.description1) {
          const m = a.description1.match(/<td[^>]*>\s*Category\s*<\/td>\s*<td[^>]*>(.*?)<\/td>/i);
          if (m) {
            const descCat = m[1].toLowerCase();
            if (descCat.includes(cat) || cat.includes(descCat) || descCat === cat) return true;
          }
        }
        return false;
      })
      .slice(0, 6);
  }, [reduxAllApps, desc1Category, app]);

  // Only fetch from API if not available in Redux cache
  const { data: similarData, isLoading: loadingSimilar } = useGetAppsQuery(
    { category: desc1Category, limit: 6 },
    {
      skip: !desc1Category || (cachedSimilarApps && cachedSimilarApps.length > 0),
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false,
    }
  );
  const desc1MatchedApps = (cachedSimilarApps && cachedSimilarApps.length > 0)
    ? cachedSimilarApps
    : (similarData?.apps || []).filter(a => app && a._id !== app._id);

  if (isLoading) return (
    <div className="max-w-5xl mx-auto px-2 md:px-0 mt-8 mb-12 animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-5 mb-4">
            <div className="w-20 h-20 rounded-xl bg-gray-200" />
            <div>
              <div className="h-8 w-48 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="h-40 bg-gray-200 rounded-xl mb-4" />
          <div className="h-60 bg-gray-200 rounded-xl" />
        </div>
        <div className="w-full md:w-72 flex-shrink-0">
          <div className="h-60 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
  if (error || !app) return <div className="p-8 text-center text-lg">App not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-2 md:px-0 mt-8 mb-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-5 mb-4">
            <img src={app.icon} alt={app.name} className="w-20 h-20 rounded-xl object-cover border bg-gray-100" />
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-1">{app.name}</h1>
              <div className="flex items-center gap-2 text-gray-700 text-base">
                <span className="font-semibold text-xl text-yellow-500">★</span>
                <span className="font-medium text-lg">{app.rating}</span>
                {/* Show category value from description1 table */}
                {(() => {
                  let categoryValue = app.category;
                  if (app.description1) {
                    const match = app.description1.match(/<td[^>]*>\s*Category\s*<\/td>\s*<td[^>]*>(.*?)<\/td>/i);
                    if (match) categoryValue = match[1];
                  }
                  return (
                    <span className="ml-3 px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700 font-medium">{categoryValue}</span>
                  );
                })()}
                {/* Show downloads */}
                {app.downloads && (
                  <span className="ml-3 px-2 py-0.5 text-xs rounded bg-green-100 text-green-700 font-medium">{app.downloads} downloads</span>
                )}
              </div>
            </div>
          </div>
          {/* Ads Section (taller) */}
          <div className="my-8">
            <AdsSection />
          </div>
          {/* App Info Table (description1 as HTML, styled with icons) */}
          {app.description1 && (
            <div className="overflow-x-auto mb-8">
              <div className="min-w-[320px] w-full rounded-xl bg-white text-sm text-gray-800 p-0">
                <table className="w-full border border-gray-200 rounded-xl bg-white text-sm text-gray-800" style={{ borderCollapse: 'collapse' }}>
                  <tbody>
                    {(() => {
                      // Extract rows from description1 HTML
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
                            <tr className="border-b" key={key}>
                              <td className="py-2 px-4 font-semibold w-40 flex items-center">{icon}{key}</td>
                              <td className="py-2 px-4">{value}</td>
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
          )}
          <AdsSection />
          {/* Features (description2 as HTML) */}
          {app.description2 && (
            <>
              <h2 className="text-2xl font-bold mt-8 mb-3">Features of {app.name}</h2>
              <div className="prose prose-indigo max-w-none mb-4" dangerouslySetInnerHTML={{ __html: app.description2 }} />
            </>
          )}
          {/* Ads after features */}
          <div className="my-8">
            <AdsSection />
          </div>
          {/* FAQ (description3 as HTML) */}
          {app.description3 && (
            <>
              
              <div className="prose prose-indigo max-w-none mb-4" dangerouslySetInnerHTML={{ __html: app.description3 }} />
            </>
          )}
          {/* Custom App image scroller and download buttons */}
          {Array.isArray(app.images) && app.images.length > 0 && (
            <div className="my-8">
              <h3 className="text-lg font-bold mb-2">Screenshots</h3>
              <div className="relative">
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-indigo-700 z-10"
                  style={{ left: 0 }}
                  onClick={() => {
                    const scroller = document.getElementById('app-image-scroller');
                    if (scroller) scroller.scrollBy({ left: -320, behavior: 'smooth' });
                  }}
                  aria-label="Scroll left"
                >
                  <FaChevronLeft />
                </button>
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-indigo-700 z-10"
                  style={{ right: 0 }}
                  onClick={() => {
                    const scroller = document.getElementById('app-image-scroller');
                    if (scroller) scroller.scrollBy({ left: 320, behavior: 'smooth' });
                  }}
                  aria-label="Scroll right"
                >
                  <FaChevronRight />
                </button>
                <div
                  id="app-image-scroller"
                  className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar"
                  style={{ maxHeight: 220 }}
                >
                  {app.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Screenshot ${idx + 1}`}
                      className="rounded-lg border border-gray-200 flex-shrink-0 bg-gray-50"
                      style={{
                        width: 'auto',
                        height: '200px',
                        maxWidth: '320px',
                        objectFit: 'scale-down',
                        background: '#f3f4f6',
                      }}
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* If category is desktop, show Microsoft Store icon instead of Play Store */}
          {(() => {
            let isDesktop = false;
            let cat1 = (app.category || '').toLowerCase();
            let cat2 = '';
            if (app.description1) {
              const match = app.description1.match(/<td[^>]*>\s*Category\s*<\/td>\s*<td[^>]*>(.*?)<\/td>/i);
              if (match) cat2 = match[1].toLowerCase();
            }
            if (cat1.includes('desktop') || cat1.includes('windows') || cat2.includes('desktop') || cat2.includes('windows')) isDesktop = true;
            return (
              <DownloadButtons playUrl={app.playStoreUrl} appStoreUrl={app.appStoreUrl} isDesktop={isDesktop} />
            );
          })()}
          {/* Ratings bar */}
          <RatingsBar rating={app.rating} votes={app.votes} />


          {/* Ads Section (taller) */}
          <div className="my-8">
            <AdsSection />
          </div>
          {/* Other Popular Apps section using AppsSection */}
          <AppsSection category="Popular Apps" />
        </div>
        {/* Sidebar */}
        <div className="w-full md:w-72 flex-shrink-0 flex flex-col">
          <AdsSection />
          {loadingSimilar ? (
            <div className="my-10 text-center text-gray-500">Loading similar apps...</div>
          ) : desc1MatchedApps.length > 0 && (
            <div className="my-10">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Similar Apps</h3>
              <div className="flex flex-col gap-3">
                {desc1MatchedApps.map((a, idx) => (
                  <AppCard app={a} idx={idx} key={a._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppDetailsPage;

