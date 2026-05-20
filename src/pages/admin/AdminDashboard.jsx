import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import AppManager from "./AppManager";
import BlogManager from "./BlogManager";
import TopicManager from "./TopicManager";
import CategoryManager from "./CategoryManager";
import { useGetAppsQuery, useGetCategoriesQuery } from '../../services/api';

import { HiOutlineCalendarDays, HiOutlineClock } from "react-icons/hi2";
import { MdApps } from "react-icons/md";
import { FaBlog, FaLayerGroup, FaServer } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";

const AdminDashboard = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('apkpac_admin_token'));
    }
  }, []);

  useEffect(() => {
    if (token === null) {
      router.push('/admin/login');
    }
  }, [token, router]);

  // Logout handler
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('apkpac_admin_token');
      router.push('/admin/login');
    }
  };

  const [time, setTime] = useState(new Date());

  // Fetch dynamic counts
  const { data: apps = [], isLoading: appsLoading } = useGetAppsQuery();
  const { data: categories = [], isLoading: categoriesLoading } = useGetCategoriesQuery();

  const [stats, setStats] = useState({
    apps: 0,
    blogs: 0,
    categories: 0,
    topics: 0,
  });

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
    // Set dynamic stats for apps and categories
    setStats((prev) => ({
      ...prev,
      apps: apps.length,
      categories: categories.length,
    }));
  }, [apps.length, categories.length]);

  const formattedDate = time.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = time.toLocaleTimeString();

  const DashboardHome = () => (
    <div className="space-y-10">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-xl p-8">
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
            <p className="text-gray-500">Today’s Date</p>
            <h3 className="font-bold">{formattedDate}</h3>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white shadow-md rounded-xl p-6 flex-1 min-w-[250px]">
          <HiOutlineClock size={40} className="text-purple-600" />
          <div>
            <p className="text-gray-500">Current Time</p>
            <h3 className="font-bold">{formattedTime}</h3>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition cursor-pointer"
          onClick={() => window.location.href = '/admin/dashboard/apps'}
        >
          <MdApps size={35} className="text-pink-500" />
          <div>
            <p className="text-gray-500">Total Apps</p>
            <h3 className="text-2xl font-bold">{appsLoading ? '...' : stats.apps}</h3>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
          <FaBlog size={30} className="text-green-500" />
          <div>
            <p className="text-gray-500">Total Blogs</p>
            <h3 className="text-2xl font-bold">{stats.blogs}</h3>
          </div>
        </div>
        <div
          className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition cursor-pointer"
          onClick={() => window.location.href = '/admin/dashboard/categories'}
        >
          <FaLayerGroup size={30} className="text-blue-500" />
          <div>
            <p className="text-gray-500">Categories</p>
            <h3 className="text-2xl font-bold">{categoriesLoading ? '...' : stats.categories}</h3>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
          <FaLayerGroup size={30} className="text-yellow-500" />
          <div>
            <p className="text-gray-500">Topics</p>
            <h3 className="text-2xl font-bold">{stats.topics}</h3>
          </div>
        </div>
      </div>

      {/* Extra Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaServer className="text-indigo-600" />
            System Status
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Server Running Smoothly</li>
            <li>✅ Database Connected</li>
            <li>⚡ API Response Time: 120ms</li>
            <li>🔐 Security Status: Protected</li>
          </ul>
        </div>

        {/* Growth Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BsGraphUp className="text-green-600" />
            Platform Growth
          </h3>
          <p className="text-gray-700 mb-2">
            📈 Traffic increased by <span className="font-bold text-green-600">18%</span> this month.
          </p>
          <p className="text-gray-700">
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

  const StaticNotice = ({ label }) => (
    <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl shadow-lg p-10">
      <div className="flex flex-col items-center">
        <span className="inline-block bg-indigo-100 text-indigo-700 rounded-full px-4 py-2 mb-4 text-lg font-semibold shadow">
          {label} Management
        </span>
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-2">This Page is Static</h2>
        <p className="text-lg text-gray-700 mb-2 text-center max-w-xl">
          You cannot change <span className="font-bold text-indigo-600">{label.toLowerCase()}</span> from here.<br/>
          If you need changes, please contact the site administrator.
        </p>
        <p className="text-md text-purple-700 mt-4 font-medium">Thank you for understanding!</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto py-6">
      {/* Admin Panel Header with Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-700">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <DashboardHome />
    </div>
  );
};

export default AdminDashboard;

