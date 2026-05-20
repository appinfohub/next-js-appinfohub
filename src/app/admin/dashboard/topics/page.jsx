'use client';

import React from 'react';

export default function TopicsAdminPage() {
  return (
    <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl shadow-lg p-10">
      <div className="flex flex-col items-center">
        <span className="inline-block bg-indigo-100 text-indigo-700 rounded-full px-4 py-2 mb-4 text-lg font-semibold shadow">
          Topics Management
        </span>
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-2">This Page is Static</h2>
        <p className="text-lg text-gray-700 mb-2 text-center max-w-xl">
          You cannot change <span className="font-bold text-indigo-600">topics</span> from here.<br/>
          If you need changes, please contact the site administrator.
        </p>
        <p className="text-md text-purple-700 mt-4 font-medium">Thank you for understanding!</p>
      </div>
    </div>
  );
}

