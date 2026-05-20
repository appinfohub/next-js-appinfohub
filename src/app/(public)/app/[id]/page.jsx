import AppDetailsPage from '@/pages/AppDetailsPage';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = String(resolvedParams.id || '').replace(/-/g, ' ');
  const title = slug ? `${slug.charAt(0).toUpperCase() + slug.slice(1)} APK Download & Review` : 'App Details - AppInfoHub';
  return {
    title,
    description: `Download ${slug || 'this app'} safely with full reviews, screenshots, and category details on AppInfoHub.`,
  };
}

export default async function AppDetails({ params }) {
  const resolvedParams = await params;
  return <AppDetailsPage slug={resolvedParams.id} />;
}
