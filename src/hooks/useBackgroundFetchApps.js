import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAppsQuery } from '../services/api';
import { setAllApps, setAppsLoading } from '../store';

/**
 * Hook to background fetch all apps and cache them in Redux
 * Uses a smaller limit and only fetches once
 * Runs automatically on app mount (in App.jsx)
 */
const useBackgroundFetchApps = () => {
  const dispatch = useDispatch();
  const existingApps = useSelector((state) => state.apps.allApps);
  const hasFetched = useRef(false);

  // Skip if already have apps in Redux (e.g. from previous navigation)
  const shouldSkip = hasFetched.current || existingApps.length > 0;

  // Fetch apps with a reasonable limit (not 10000)
  const { data, isLoading, error } = useGetAppsQuery(
    { page: 1, limit: 500 },
    {
      skip: shouldSkip,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }
  );

  useEffect(() => {
    if (isLoading) {
      dispatch(setAppsLoading());
    } else if (data?.apps) {
      hasFetched.current = true;
      dispatch(setAllApps(data.apps));
    }
  }, [data, isLoading, dispatch]);

  return { data, isLoading, error };
};

export default useBackgroundFetchApps;
