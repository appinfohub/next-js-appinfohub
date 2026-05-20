/**
 * Cloudinary URL Optimizer
 * Automatically optimizes Cloudinary URLs with performance parameters
 * Supports dynamic width: f_auto,q_auto:good,w_{size}
 */

const DEFAULT_WIDTH = 500;

/**
 * Builds a Cloudinary transformation string with the given width
 * @param {number} width
 * @returns {string}
 */
const buildTransform = (width = DEFAULT_WIDTH) => `f_auto,q_auto:good,w_${width}`;

/**
 * Checks if a URL is a Cloudinary URL and not already optimized
 * @param {string} url
 * @returns {boolean}
 */
export const isCloudinaryURL = (url) => {
  if (!url || typeof url !== 'string') return false;
  return url.includes('res.cloudinary.com') && !url.includes('f_auto,q_auto');
};

/**
 * Optimizes a single Cloudinary URL by adding transformation parameters
 * @param {string} url - The Cloudinary URL to optimize
 * @param {number} [width=500] - Target width for the image
 * @returns {string} - The optimized URL or original if not Cloudinary
 */
export const optimizeCloudinaryURL = (url, width = DEFAULT_WIDTH) => {
  if (!url || typeof url !== 'string' || !url.includes('res.cloudinary.com')) return url;
  
  // If already has a width transform, replace it with the requested width
  if (url.match(/w_\d+/)) {
    return url.replace(/w_\d+/, `w_${width}`);
  }
  
  if (!isCloudinaryURL(url)) return url;
  
  // Replace /upload/ with /upload/{PARAMS}/
  return url.replace('/upload/', `/upload/${buildTransform(width)}/`);
};

/**
 * Optimizes multiple URLs at once
 * @param {string[]} urls - Array of URLs
 * @returns {string[]} - Array of optimized URLs
 */
export const optimizeCloudinaryURLs = (urls) => {
  if (!Array.isArray(urls)) return urls;
  return urls.map((url) => optimizeCloudinaryURL(url));
};

/**
 * Optimizes an object containing image URLs
 * Recursively searches for typical image field names like: image, images, icon, logo, banner, coverImage, thumbnail
 * 
 * Usage:
 * const app = { icon: 'https://res.cloudinary.com/...', images: ['...', '...'] };
 * const optimized = optimizeCloudinaryObject(app);
 * 
 * @param {object} obj - Object potentially containing Cloudinary URLs
 * @returns {object} - Object with optimized URLs
 */
export const optimizeCloudinaryObject = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;

  const result = Array.isArray(obj) ? [...obj] : { ...obj };
  const imageFields = [
    'image',
    'images',
    'icon',
    'logo',
    'banner',
    'coverImage',
    'thumbnail',
    'avatar',
    'poster',
    'screenshot',
    'screenshots',
  ];

  for (const key in result) {
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      const value = result[key];

      // Handle string URLs
      if (typeof value === 'string' && isCloudinaryURL(value)) {
        result[key] = optimizeCloudinaryURL(value);
      }
      // Handle arrays of URLs
      else if (
        Array.isArray(value) &&
        imageFields.some((field) => key.toLowerCase().includes(field.toLowerCase()))
      ) {
        result[key] = value.map((item) => {
          if (typeof item === 'string' && isCloudinaryURL(item)) {
            return optimizeCloudinaryURL(item);
          }
          return item;
        });
      }
      // Recursively handle nested objects
      else if (typeof value === 'object' && value !== null) {
        result[key] = optimizeCloudinaryObject(value);
      }
    }
  }

  return result;
};

/**
 * Optimizes Cloudinary URLs within HTML content
 * Finds URLs in img src, picture source, and other attributes
 * 
 * @param {string} htmlContent - HTML string possibly containing Cloudinary URLs
 * @returns {string} - HTML with optimized URLs
 */
export const optimizeCloudinaryHTML = (htmlContent) => {
  if (!htmlContent || typeof htmlContent !== 'string') return htmlContent;

  // Match all Cloudinary URLs in the content
  return htmlContent.replace(
    /(https?:\/\/res\.cloudinary\.com\/[^\s"')<>]+)/g,
    (url) => optimizeCloudinaryURL(url)
  );
};

/**
 * React Hook-friendly: Gets optimized image URL with caching
 * Can be used in useEffect or useMemo to avoid recalculating
 * 
 * @param {string} url - Original URL
 * @returns {string} - Optimized URL
 */
export const getOptimizedImageSrc = (url) => {
  return optimizeCloudinaryURL(url);
};

/**
 * Custom hook for React components to optimize image URLs
 * Usage in React:
 * 
 * const OptimizedImage = ({ src, alt }) => {
 *   const optimizedSrc = useOptimizedCloudinaryURL(src);
 *   return <img src={optimizedSrc} alt={alt} />;
 * };
 * 
 * NOTE: Only use this in React components. Import React first.
 */
export const createUseOptimizedCloudinaryURL = (React) => {
  return (url) => {
    return React.useMemo(() => optimizeCloudinaryURL(url), [url]);
  };
};

/**
 * Batch optimize a fetch response containing Cloudinary URLs
 * Useful for API response interceptors
 * 
 * @param {object|array} data - API response data
 * @returns {object|array} - Response with optimized URLs
 */
export const optimizeAPIResponse = (data) => {
  return optimizeCloudinaryObject(data);
};

export default {
  isCloudinaryURL,
  optimizeCloudinaryURL,
  optimizeCloudinaryURLs,
  optimizeCloudinaryObject,
  optimizeCloudinaryHTML,
  getOptimizedImageSrc,
  optimizeAPIResponse,
};
