'use client';

import React, { useMemo } from "react";
import HeroSection from "../components/HeroSection";
import AdsSection from "../components/AdsSection";
import AppsSection from "../components/AppsSection";
import { useGetAppsByCategoriesQuery } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setAllApps } from "../store";
import CategoriesSection from "../components/CategoriesSection";
import HomeAppSection from "@/components/HomeAppSection";

const CATEGORIES = [
  "Top Apps", "Desktop",

];

const HomePage = () => {
  const dispatch = useDispatch();
  const existingApps = useSelector((state) => state.apps.allApps);

  // Single batch request for all homepage categories
  const { data: batchData } = useGetAppsByCategoriesQuery({
    categories: CATEGORIES,
    limit: 9,
  });

  // Populate Redux cache with batch data so detail pages load instantly
  React.useEffect(() => {
    if (batchData && existingApps.length === 0) {
      const allApps = Object.values(batchData).flat();
      // Deduplicate by _id
      const unique = [...new Map(allApps.map(a => [a._id, a])).values()];
      if (unique.length > 0) {
        dispatch(setAllApps(unique));
      }
    }
  }, [batchData, existingApps.length, dispatch]);

  return (
    <>
      {/* <HeroSection /> */}
      <div className="my-8">
        <AdsSection />
      </div>

      {/* {CATEGORIES.map((cat, i) => (
              <React.Fragment key={cat}>
                <AppsSection category={cat} batchApps={batchData?.[cat]} />
                <div className="my-8">
                  <AdsSection />
                </div>
              </React.Fragment>
            ))} */}

      <AppsSection category="Top Apps" />



      <HomeAppSection category="Tools" />
      <HomeAppSection category="desktop" />


      <CategoriesSection />
      <HomeAppSection category="Action" />
      <HomeAppSection category="Finance" />

    </>
  );
};

export default HomePage;

