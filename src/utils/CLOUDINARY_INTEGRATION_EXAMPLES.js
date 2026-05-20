/**
 * Integration Examples for Cloudinary URL Optimization
 * 
 * This file shows how to integrate the optimization utilities
 * into your existing frontend code
 */

// ============================================
// 1. OPTIMIZE API RESPONSE IN AXIOS INTERCEPTOR
// ============================================

// In your frontend/src/services/api.js, add this interceptor:

/*
import { optimizeAPIResponse } from '../utils/cloudinaryOptimizer';

// Response interceptor to automatically optimize Cloudinary URLs
api.interceptors.response.use(
  (response) => {
    // Optimize all Cloudinary URLs in API responses
    if (response.data) {
      response.data = optimizeAPIResponse(response.data);
    }
    return response;
  },
  (error) => Promise.reject(error)
);
*/

// ============================================
// 2. OPTIMIZE APP CARD COMPONENT
// ============================================

/*
import { optimizeCloudinaryURL } from '../utils/cloudinaryOptimizer';

const AppCard = ({ app }) => {
  const optimizedIcon = optimizeCloudinaryURL(app.icon);
  const optimizedImages = app.images?.map(img => optimizeCloudinaryURL(img)) || [];

  return (
    <div className="app-card">
      <img src={optimizedIcon} alt={app.name} className="app-icon" />
      // Use optimizedImages for screenshots
    </div>
  );
};
// export default AppCard;
*/

// ============================================
// 3. OPTIMIZE IMAGE SCROLLER COMPONENT
// ============================================

/*
import { optimizeCloudinaryURLs } from '../utils/cloudinaryOptimizer';

const AppImageScroller = ({ imageUrls }) => {
  const optimizedImages = optimizeCloudinaryURLs(imageUrls);

  return (
    <div className="image-scroller">
      {optimizedImages.map((url, index) => (
        <img key={index} src={url} alt={`Screenshot ${index + 1}`} />
      ))}
    </div>
  );
};
// export default AppImageScroller;
*/

// ============================================
// 4. REACT HOOK USAGE
// ============================================

/*
import { useMemo } from 'react';
import { optimizeCloudinaryURL } from '../utils/cloudinaryOptimizer';

const BlogCard = ({ blog }) => {
  // Memoize the optimization to prevent unnecessary recalculations
  const optimizedCoverImage = useMemo(
    () => optimizeCloudinaryURL(blog.coverImage),
    [blog.coverImage]
  );

  return (
    <article>
      <img src={optimizedCoverImage} alt={blog.title} className="blog-thumbnail" />
      <h3>{blog.title}</h3>
    </article>
  );
};
// export default BlogCard;
*/

// ============================================
// 5. OPTIMIZE HTML CONTENT WITH IMAGES
// ============================================

/*
import { optimizeCloudinaryHTML } from '../utils/cloudinaryOptimizer';
import DOMPurify from 'dompurify';

const BlogDetailView = ({ blog }) => {
  // Sanitize and optimize HTML content
  const optimizedContent = optimizeCloudinaryHTML(blog.content);
  const cleanHTML = DOMPurify.sanitize(optimizedContent);

  return (
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
};
// export default BlogDetailView;
*/

// ============================================
// 6. BATCH OPTIMIZE WHOLE OBJECT
// ============================================

/*
import { optimizeCloudinaryObject } from '../utils/cloudinaryOptimizer';

const AppDetailsPage = ({ appData }) => {
  // Automatically optimize all image URLs in the app object
  const optimizedApp = optimizeCloudinaryObject(appData);

  return (
    <div>
      <img src={optimizedApp.icon} alt={optimizedApp.name} />
      {optimizedApp.images?.map((img) => (
        <img key={img} src={img} alt="Screenshot" />
      ))}
      <div dangerouslySetInnerHTML={{ __html: optimizedApp.description2 }} />
    </div>
  );
};
// export default AppDetailsPage;
*/

// ============================================
// 7. API SERVICE WITH AUTOMATIC OPTIMIZATION
// ============================================

/*
// frontend/src/services/appApi.js

import axios from 'axios';
import { optimizeAPIResponse } from '../utils/cloudinaryOptimizer';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const appApi = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchApp = async (id) => {
  const response = await appApi.get(`/api/apps/${id}`);
  return optimizeAPIResponse(response.data);
};

export const fetchAllApps = async (category = '') => {
  const response = await appApi.get(`/api/apps`, {
    params: { category },
  });
  return optimizeAPIResponse(response.data);
};

export const fetchBlog = async (id) => {
  const response = await appApi.get(`/api/blogs/${id}`);
  return optimizeAPIResponse(response.data);
};

export const fetchAllBlogs = async () => {
  const response = await appApi.get(`/api/blogs`);
  return optimizeAPIResponse(response.data);
};

// export default appApi;
*/

// ============================================
// QUICK REFERENCE
// ============================================

/*
Import what you need:

// Single URL optimization
import { optimizeCloudinaryURL } from '../utils/cloudinaryOptimizer';
const optimized = optimizeCloudinaryURL(url);

// Multiple URLs
import { optimizeCloudinaryURLs } from '../utils/cloudinaryOptimizer';
const optimized = optimizeCloudinaryURLs(urlArray);

// Object optimization
import { optimizeCloudinaryObject } from '../utils/cloudinaryOptimizer';
const optimized = optimizeCloudinaryObject(dataObject);

// HTML content
import { optimizeCloudinaryHTML } from '../utils/cloudinaryOptimizer';
const optimized = optimizeCloudinaryHTML(htmlString);

// API response
import { optimizeAPIResponse } from '../utils/cloudinaryOptimizer';
const optimized = optimizeAPIResponse(apiData);

Parameters added to all URLs:
- f_auto: Auto-detect format (WebP, AVIF for modern browsers)
- q_auto:good: Auto quality (good balance between quality and size)
- w_500: Responsive width optimization

This reduces bandwidth, improves load times, and provides better UX!
*/

// This is a documentation file - not meant to be imported
// Copy examples from the commented sections into your actual project files.
