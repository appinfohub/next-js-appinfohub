import AllAppsPage from '@/pages/AllAppsPage';

export function generateMetadata({ params }) {
  const category = String(params.slug || '').replace(/-/g, ' ');
  return {
    title: `${category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Apps'} - AppInfoHub`,
    description: `Discover top ${category || 'apps'} with safe APK downloads, in-depth reviews, and curated app collections on AppInfoHub.`,
  };
}

export default function AllApps() {
  return <AllAppsPage />;
}
