import AllAppsPage from '@/pages/AllAppsPage';

export async function generateMetadata({ params }) {
  const resolved = await params;
  const rawSlug = Array.isArray(resolved?.slug) ? resolved.slug[0] : resolved?.slug || '';
  const category = String(rawSlug).replace(/-/g, ' ');
  return {
    title: `${category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Apps'} - AppInfoHub`,
    description: `Discover top ${category || 'apps'} with safe APK downloads, in-depth reviews, and curated app collections on AppInfoHub.`,
  };
}

export default function AllApps() {
  return <AllAppsPage />;
}
