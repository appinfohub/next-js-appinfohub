'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import useBackgroundFetchApps from '@/hooks/useBackgroundFetchApps';

export default function PublicLayout({ children }) {
  // Background fetch all apps on mount to populate Redux cache
  // This makes app details pages load INSTANTLY from cache
  useBackgroundFetchApps();

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

