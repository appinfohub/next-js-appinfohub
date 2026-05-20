import React from "react";
import { topFreeApps } from "../data/topFreeApps";
import Link from "next/link";

const AppImageScroller = () => {
  return (
    <div className="w-full overflow-x-auto py-4 mb-6">
      <div className="flex gap-4 min-w-[400px]">
        {topFreeApps.map((app) => (
          <div key={app.id} className="flex flex-col items-center min-w-[90px]">
            <img
              src={app.image}
              alt={app.name}
              className="w-16 h-16 rounded-xl object-cover border bg-gray-100 mb-2"
              loading="lazy"
            />
            <Link
              to={`/apps/${app.id}`}
              className="text-xs text-center text-blue-600 font-semibold hover:underline truncate w-20"
            >
              {app.name.split(":")[0]}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppImageScroller;

