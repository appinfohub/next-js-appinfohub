const SeoJsonLd = ({ data, id }) => {
  if (!data) return null;
  return (
    <script
      id={id || 'seo-jsonld'}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default SeoJsonLd;
