'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import useBackgroundFetchApps from '@/hooks/useBackgroundFetchApps';

export default function PublicLayout({ children }) {
 
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

