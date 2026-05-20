import { configureStore, createSlice } from '@reduxjs/toolkit';
import { api } from './services/api';

// Helper to slugify app name
const slugify = (name) => name?.toLowerCase().replace(/\s+/g, '-') || '';

// Create a slice to store background-fetched apps
const appsSlice = createSlice({
  name: 'apps',
  initialState: {
    allApps: [],
    appsBySlug: {}, // O(1) lookup map
    isLoading: false,
    error: null,
  },
  reducers: {
    setAllApps: (state, action) => {
      state.allApps = action.payload;
      // Build slug lookup map for instant access
      const map = {};
      for (const app of action.payload) {
        map[slugify(app.name)] = app;
      }
      state.appsBySlug = map;
      state.isLoading = false;
    },
    setAppsLoading: (state) => {
      state.isLoading = true;
    },
    setAppsError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setAllApps, setAppsLoading, setAppsError } = appsSlice.actions;

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    apps: appsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
