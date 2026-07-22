/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Matches any root-level path except system/static routes
        source: '/:category((?!api|_next|static|favicon.ico|app|categories|placeholder.png).*)',
        destination: '/apps/:category',
      },
    ];
  },
};

export default nextConfig;