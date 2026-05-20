const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://appinfohub.com';
const defaultImage = `${siteUrl}/appinfohublogo2.png`;

export function getCanonical(path = '/') {
  return new URL(path, siteUrl).toString();
}

export function pageMetadata({ title, description, path, image = defaultImage, keywords = [] }) {
  const canonical = getCanonical(path);
  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'AppInfoHub',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    keywords,
  };
}

export function webPageSchema({ title, description, path, image = defaultImage, keywords = [] }) {
  const canonical = getCanonical(path);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: canonical,
    name: title,
    description,
    publisher: {
      '@type': 'Organization',
      name: 'AppInfoHub',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: getCanonical('/appinfofav.png'),
      },
    },
    mainEntityOfPage: canonical,
    inLanguage: 'en-US',
  };
  if (keywords.length) schema.keywords = keywords.join(', ');
  if (image) schema.image = {
    '@type': 'ImageObject',
    url: image,
  };
  return schema;
}

export function collectionPageSchema({ title, description, path, image = defaultImage, keywords = [] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url: getCanonical(path),
    name: title,
    description,
    publisher: {
      '@type': 'Organization',
      name: 'AppInfoHub',
      url: siteUrl,
    },
    mainEntityOfPage: getCanonical(path),
    inLanguage: 'en-US',
    image: {
      '@type': 'ImageObject',
      url: image,
    },
    keywords: keywords.length ? keywords.join(', ') : undefined,
  };
}

export function softwareApplicationSchema({ name, description, path, image = defaultImage, category, platform = 'Android', url, keywords = [] }) {
  const canonical = getCanonical(path);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: url || canonical,
    applicationCategory: category || 'MobileApplication',
    operatingSystem: platform,
    publisher: {
      '@type': 'Organization',
      name: 'AppInfoHub',
      url: siteUrl,
    },
    mainEntityOfPage: canonical,
  };
  if (image) {
    schema.image = {
      '@type': 'ImageObject',
      url: image,
    };
  }
  if (keywords.length) schema.keywords = keywords.join(', ');
  return schema;
}

