/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Top 12 category slugs — redirect to the apps category pages
    const categories = [
      'communication',
      'social',
      'entertainment',
      'music-audio',
      'news-magazines',
      'finance',
      'shopping',
      'maps-navigation',
      'tools',
      'food-drink',
      'personalization',
      'weather',
    ];

    return categories.map((c) => ({
      source: `/${c}`,
      destination: `/apps/${c}`,
      permanent: false,
    }));
  },
};

export default nextConfig;
