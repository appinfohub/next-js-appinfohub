/**
 * PRACTICAL IMPLEMENTATION EXAMPLES
 * 
 * Copy these patterns into your existing components
 */

// ============================================
// EXAMPLE 1: AppCard with Cloudinary Optimization
// ============================================

/*
// frontend/src/components/AppCard.jsx

import { useCallback, useMemo } from 'react';
import { optimizeCloudinaryURL } from '../utils/cloudinaryOptimizer';
import { Link } from 'react-router-dom';

const AppCard = ({ app }) => {
  // Memoize optimization to prevent recalculation on re-renders
  const optimizedIcon = useMemo(
    () => optimizeCloudinaryURL(app.icon),
    [app.icon]
  );

  return (
    <Link to={`/app/${app._id}`} className="app-card">
      <div className="app-icon-wrapper">
        <img
          src={optimizedIcon}
          alt={app.name}
          className="app-icon"
          loading="lazy"
          onError={(e) => {
            console.error(`Failed to load icon: ${optimizedIcon}`);
            e.target.src = 'https://res.cloudinary.com/fallback/image.png';
          }}
        />
      </div>
      <div className="app-info">
        <h3>{app.name}</h3>
        <p>{app.category}</p>
        <div className="ratings">⭐ {app.rating}</div>
      </div>
    </Link>
  );
};

export default AppCard;
*/

// ============================================
// EXAMPLE 2: AppImageScroller with Optimization
// ============================================

/*
// frontend/src/components/AppImageScroller.jsx

import { useState, useMemo } from 'react';
import { optimizeCloudinaryURLs } from '../utils/cloudinaryOptimizer';

const AppImageScroller = ({ imageUrls = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Optimize all URLs once
  const optimizedImages = useMemo(
    () => optimizeCloudinaryURLs(imageUrls),
    [imageUrls]
  );

  if (!optimizedImages.length) {
    return <div className="no-images">No images available</div>;
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? optimizedImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === optimizedImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="image-scroller">
      <div className="scroller-container">
        <img
          src={optimizedImages[currentIndex]}
          alt={`Screenshot ${currentIndex + 1}`}
          className="scroller-image"
          loading="lazy"
        />
      </div>

      <div className="scroller-controls">
        <button onClick={handlePrevious} className="btn-prev">
          ❮
        </button>
        <div className="scroller-dots">
          {optimizedImages.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        <button onClick={handleNext} className="btn-next">
          ❯
        </button>
      </div>
    </div>
  );
};

export default AppImageScroller;
*/

// ============================================
// EXAMPLE 3: BlogCard with Cover Image Optimization
// ============================================

/*
// frontend/src/components/BlogCard.jsx

import { useMemo } from 'react';
import { optimizeCloudinaryURL } from '../utils/cloudinaryOptimizer';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/dateUtils';

const BlogCard = ({ blog }) => {
  const optimizedCoverImage = useMemo(
    () => optimizeCloudinaryURL(blog.coverImage),
    [blog.coverImage]
  );

  return (
    <Link to={`/blog/${blog._id}`} className="blog-card">
      <div className="blog-cover">
        <img
          src={optimizedCoverImage}
          alt={blog.title}
          className="cover-image"
          loading="lazy"
        />
      </div>
      <div className="blog-meta">
        <h3>{blog.title}</h3>
        <time>{formatDate(blog.createdAt)}</time>
      </div>
    </Link>
  );
};

export default BlogCard;
*/

// ============================================
// EXAMPLE 4: AppDetailsPage - Full Integration
// ============================================

/*
// frontend/src/pages/AppDetailsPage.jsx

import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAppQuery } from '../store/api'; // Redux slice
import { optimizeCloudinaryObject, optimizeCloudinaryHTML } from '../utils/cloudinaryOptimizer';
import DOMPurify from 'dompurify';
import AppImageScroller from '../components/AppImageScroller';
import DownloadButtons from '../components/DownloadButtons';

const AppDetailsPage = () => {
  const { id } = useParams();
  const { data: appData, isLoading, error } = useGetAppQuery(id);

  // Optimize all image URLs in the app data
  const optimizedApp = useMemo(
    () => (appData ? optimizeCloudinaryObject(appData) : null),
    [appData]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || !optimizedApp) return <div>Error loading app</div>;

  // Optimize HTML descriptions that might contain images
  const optimizedDesc2 = optimizeCloudinaryHTML(optimizedApp.description2 || '');
  const sanitizedDesc2 = DOMPurify.sanitize(optimizedDesc2);

  return (
    <div className="app-details">
      <header className="app-header">
        <img
          src={optimizedApp.icon}
          alt={optimizedApp.name}
          className="app-icon-large"
        />
        <h1>{optimizedApp.name}</h1>
      </header>

      <section className="app-screenshots">
        <h2>Screenshots</h2>
        <AppImageScroller imageUrls={optimizedApp.images} />
      </section>

      <section className="app-description">
        <h2>Description</h2>
        <div
          className="html-content"
          dangerouslySetInnerHTML={{ __html: sanitizedDesc2 }}
        />
      </section>

      <section className="app-downloads">
        <DownloadButtons app={optimizedApp} />
      </section>
    </div>
  );
};

export default AppDetailsPage;
*/

// ============================================
// EXAMPLE 5: Redux RTK Query with Auto-Optimization
// ============================================

/*
// frontend/src/store/api.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { optimizeAPIResponse } from '../utils/cloudinaryOptimizer';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
});

// Wrapper to optimize all responses
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
  tagTypes: ['App', 'Blog', 'Category'],
  endpoints: (builder) => ({
    getApp: builder.query({
      query: (id) => `/apps/${id}`,
      providesTags: (result, error, id) => [{ type: 'App', id }],
    }),
    getApps: builder.query({
      query: ({ page = 1, limit = 20, category } = {}) => {
        let url = `/apps?page=${page}&limit=${limit}`;
        if (category) url += `&category=${encodeURIComponent(category)}`;
        return url;
      },
      providesTags: ['App'],
    }),
    getBlog: builder.query({
      query: (id) => `/blogs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
    getBlogs: builder.query({
      query: () => '/blogs',
      providesTags: ['Blog'],
    }),
    getCategories: builder.query({
      query: () => '/categories',
      providesTags: ['Category'],
    }),
  }),
});

export const {
  useGetAppQuery,
  useGetAppsQuery,
  useGetBlogQuery,
  useGetBlogsQuery,
  useGetCategoriesQuery,
} = api;
*/

// ============================================
// EXAMPLE 6: Axios Interceptor (Alternative to RTK)
// ============================================

/*
// frontend/src/services/api.js

import axios from 'axios';
import { optimizeAPIResponse } from '../utils/cloudinaryOptimizer';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Response interceptor - optimize all responses
api.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = optimizeAPIResponse(response.data);
    }
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
*/

// ============================================
// EXAMPLE 7: Image with Loading States
// ============================================

/*
// Custom component with optimization

import { useState, useMemo } from 'react';
import { optimizeCloudinaryURL } from '../utils/cloudinaryOptimizer';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://via.placeholder.com/300',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const optimizedSrc = useMemo(() => optimizeCloudinaryURL(src), [src]);

  const displaySrc = error ? fallbackSrc : optimizedSrc;

  return (
    <div className={`image-container ${isLoading ? 'loading' : ''}`}>
      <img
        src={displaySrc}
        alt={alt}
        className={`optimized-image ${className}`}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        {...props}
      />
      {isLoading && <div className="image-skeleton" />}
    </div>
  );
};

export default OptimizedImage;
*/

// ============================================
// USAGE IN JSX FILES
// ============================================

/*
// Simple usage:
<img src={optimizeCloudinaryURL(app.icon)} alt={app.name} />

// Complex usage with all features:
import { optimizeCloudinaryObject, optimizeCloudinaryHTML } from '../utils/cloudinaryOptimizer';

const app = optimizeCloudinaryObject(rawAppData);
const html = optimizeCloudinaryHTML(rawHtmlContent);

// In useEffect:
import { useEffect, useState } from 'react';
import { optimizeAPIResponse } from '../utils/cloudinaryOptimizer';

useEffect(() => {
  fetchData().then(data => {
    setOptimizedData(optimizeAPIResponse(data));
  });
}, []);
*/

export default {};
