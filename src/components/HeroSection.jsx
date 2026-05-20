'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAppsQuery } from "../services/api";

const HeroSection = () => {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  
  // Fetch apps with search query - only when user types
  const { data } = useGetAppsQuery({ 
    page: 1, 
    limit: 10,
    search: search.trim()
  }, {
    skip: !search.trim(), // Don't fetch until user types
  });
  const searchResults = data?.apps || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
      setSearch("");
      setShowDropdown(false);
    }
  };

  return (
    <section
      className="relative isolate flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] w-full bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=60&fm=webp')",
      }}
    >
      {/* Content */}
      <div className="relative z-30 flex flex-col items-center w-full px-4 py-16">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-4 drop-shadow-lg tracking-tight">
          Discover & Download{" "}
          <span className="text-blue-400">Top Android Apps</span>
        </h1>

        <p className="text-lg md:text-2xl text-center mb-8 drop-shadow font-medium">
          Fast, safe, and free APKs for everyone on AppInfoHub
        </p>

        {/* Search Box */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl relative"
        >
          <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-xl">
            <input
              type="text"
              placeholder="Search for your favorite app..."
              className="flex-1 px-5 py-3 text-gray-800 text-lg outline-none"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowDropdown(e.target.value.trim().length > 0);
              }}
              onFocus={() => search.trim().length > 0 && setShowDropdown(true)}
              onBlur={() =>
                setTimeout(() => setShowDropdown(false), 200)
              }
              autoComplete="off"
            />

            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 px-7 py-3 font-semibold text-white text-lg transition cursor-pointer"
            >
              Search
            </button>
          </div>

          {/* Dropdown with matching apps - only show when searching */}
          {showDropdown && search.trim() && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-3 bg-white border border-gray-200 rounded-xl shadow-2xl z-[999] max-h-80 overflow-y-auto">
              {searchResults.map((app) => {
                const slug = app.name
                  ? app.name.toLowerCase().replace(/\s+/g, "-")
                  : "";

                return (
                  <div
                    key={app._id}
                    onMouseDown={() => {
                      router.push(`/app/${encodeURIComponent(slug)}`);
                      setShowDropdown(false);
                      setSearch("");
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition cursor-pointer border-b last:border-b-0"
                  >
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-10 h-10 rounded-lg object-cover border bg-gray-100"
                    />

                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-gray-800 truncate block">
                        {app.name}
                      </span>
                      <span className="text-xs rounded bg-blue-100 text-blue-700 px-2 py-0.5 font-medium inline-block">
                        {app.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </form>
      </div>

      {/* Overlay (Lower z-index) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default HeroSection;

