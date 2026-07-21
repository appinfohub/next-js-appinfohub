import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { optimizeAPIResponse } from '../utils/cloudinaryOptimizer';

// Base query with Cloudinary URL optimization
const baseQuery = fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api' });

const baseQueryWithOptimization = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  
  // Auto-optimize all Cloudinary URLs in responses
  if (result.data) {
    result.data = optimizeAPIResponse(result.data);
  }
  
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithOptimization,
  tagTypes: ['App', 'Category'],
  keepUnusedDataFor: 3600, // Keep cache data for 1 hour
  endpoints: (builder) => ({
    // Categories
    getCategories: builder.query({
      query: () => '/categories',
      providesTags: ['Category'],
    }),
    addCategory: builder.mutation({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, name }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: { name },
      }),
      invalidatesTags: ['Category'],
    }),
    // Apps
    getApps: builder.query({
      // Accepts { page, limit, category, search, type } as params
      query: ({ page = 1, limit = 100, category, search, type } = {}) => {
        let url = `/apps?page=${page}&limit=${limit}`;
        if (category) url += `&category=${encodeURIComponent(category)}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (type) url += `&type=${encodeURIComponent(type)}`;
        return url;
      },
      providesTags: (result) =>
        result?.apps
          ? [
              ...result.apps.map(({ _id }) => ({ type: 'App', id: _id })),
              { type: 'App', id: 'LIST' },
            ]
          : [{ type: 'App', id: 'LIST' }],
    }),
    addApp: builder.mutation({
      query: (body) => ({
        url: '/apps',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'App', id: 'LIST' }],
    }),
    // Get single app by slug - with per-app caching
    getAppBySlug: builder.query({
      query: (slug) => `/apps/slug/${encodeURIComponent(slug)}`,
      providesTags: (result) =>
        result ? [{ type: 'App', id: result._id }] : [{ type: 'App' }],
    }),
    // Batch: get apps for multiple categories in one request
    getAppsByCategories: builder.query({
      query: ({ categories, limit = 9 }) =>
        `/apps/by-categories?categories=${encodeURIComponent(categories.join(','))}&limit=${limit}`,
      providesTags: [{ type: 'App', id: 'LIST' }],
    }),
    // Add more endpoints as needed
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetAppsQuery,
  useAddAppMutation,
  useGetAppBySlugQuery,
  useGetAppsByCategoriesQuery,
} = api;
