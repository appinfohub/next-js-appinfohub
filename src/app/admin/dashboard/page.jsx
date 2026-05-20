'use client';

import React, { useEffect, useState } from "react";
import { useGetAppsQuery, useGetCategoriesQuery } from '@/services/api';
import { useRouter } from 'next/navigation';

import { HiOutlineCalendarDays, HiOutlineClock } from "react-icons/hi2";
import { MdApps } from "react-icons/md";
import { FaLayerGroup, FaServer } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";

export default function AdminDashboardHome() {
  const router = useRouter();
  const [time, setTime] = useState(new Date());

  // Fetch dynamic counts
  const { data: appsData, isLoading: appsLoading } = useGetAppsQuery();
  const { data: categories = [], isLoading: categoriesLoading } = useGetCategoriesQuery();

  const apps = appsData?.apps || [];
  const totalApps = appsData?.total ?? apps.length;

  const [stats, setStats] = useState({
    apps: 0,
    categories: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setStats({
      apps: totalApps,
      categories: categories.length,
    });
  }, [totalApps, categories.length]);

  const formattedDate = time.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = time.toLocaleTimeString();

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-xl p-8 animate-fade-in">
        <h2 className="text-3xl font-extrabold mb-2">
          Welcome Back, Admin 👋
        </h2>
        <p className="text-lg opacity-90">
          Manage your platform efficiently and monitor performance in real-time.
        </p>
      </div>

      {/* Date & Time */}
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-4 bg-white shadow-md rounded-xl p-6 flex-1 min-w-[250px]">
          <HiOutlineCalendarDays size={40} className="text-indigo-600" />
          <div>
            <p className="text-gray-500 text-sm font-semibold">Today’s Date</p>
            <h3 className="font-bold text-lg text-gray-800">{formattedDate}</h3>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white shadow-md rounded-xl p-6 flex-1 min-w-[250px]">
          <HiOutlineClock size={40} className="text-purple-600" />
          <div>
            <p className="text-gray-500 text-sm font-semibold">Current Time</p>
            <h3 className="font-bold text-lg text-gray-800">{formattedTime}</h3>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div
          className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl hover:scale-105 transition cursor-pointer"
          onClick={() => router.push('/admin/dashboard/apps')}
        >
          <MdApps size={35} className="text-pink-500" />
          <div>
            <p className="text-gray-500 text-sm font-semibold">Total Apps</p>
            <h3 className="text-2xl font-bold text-gray-800">{appsLoading ? '...' : stats.apps}</h3>
          </div>
        </div>
        <div
          className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl hover:scale-105 transition cursor-pointer"
          onClick={() => router.push('/admin/dashboard/categories')}
        >
          <FaLayerGroup size={30} className="text-blue-500" />
          <div>
            <p className="text-gray-500 text-sm font-semibold">Categories</p>
            <h3 className="text-2xl font-bold text-gray-800">{categoriesLoading ? '...' : stats.categories}</h3>
          </div>
        </div>
      </div>

      {/* Extra Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System Status */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-700">
            <FaServer />
            System Status
          </h3>
          <ul className="space-y-2 text-gray-700 font-medium">
            <li>✅ Server Running Smoothly</li>
            <li>✅ Database Connected</li>
            <li>⚡ API Response Time: 120ms</li>
            <li>🔐 Security Status: Protected</li>
          </ul>
        </div>

        {/* Growth Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-700">
            <BsGraphUp />
            Platform Growth
          </h3>
          <p className="text-gray-700 mb-2 font-medium">
            📈 Traffic increased by <span className="font-bold text-green-600">18%</span> this month.
          </p>
          <p className="text-gray-700 font-medium">
            🚀 New content uploads growing consistently.
          </p>
        </div>
      </div>

      {/* Motivational Section */}
      <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-lg shadow-sm">
        <p className="text-lg font-medium text-indigo-800">
          “Success usually comes to those who are too busy to be looking for it.”
        </p>
        <p className="text-sm text-gray-600 mt-2">– Keep building your platform 🚀</p>
      </div>
    </div>
  );
}

