const APP_CATEGORY_NAMES = [
  // Apps Categories
  'Top Apps',
  'Popular Apps',
  'Desktop',
  'Finance',
  'Entertainment',
  'Communication',
  'Tools',
  'Shopping',
  'Food',
  'Food & Drink',
  'Audio',
  'Music & Audio',
  'Personalization',
  'Lifestyle',
  'Travel',
  'Maps',
  'Maps & Navigation',
  'Productivity',
  'Video',
  'Education',
  'Business',
  'Social',
  'Medical',
  'Reference',
  'Weather',
  'Housing',
  'Art',
  'News',
  'News & Magazines',
  'Vehicles',
  'Photography',
  'Dating',
  'Comics',
  'Beauty',
  'Parenting',

  // Games Categories (routed under apps)
  'Action',
  'Adventure',
  'Board',
  'Card',
  'Casual',
  'Demo',
  'Music',
  'Puzzle',
  'Role Playing',
  'Sports',
  'Word',
  'Arcade',
  'Racing',
  'Simulation',
  'Strategy',
  'Educational',
  'Casino',
];

const normalizeCategoryName = (value = '') => String(value || '').trim().toLowerCase();

const matchesCategorySet = (category, allowedNames) => {
  const normalizedCategory = normalizeCategoryName(category);
  if (!normalizedCategory) return false;

  return allowedNames.some((name) => normalizeCategoryName(name) === normalizedCategory);
};

export const isAppCategory = (category = '') => matchesCategorySet(category, APP_CATEGORY_NAMES);

export const filterAppsByType = (items = [], type = '') => {
  const normalizedType = String(type || '').trim().toLowerCase();

  // Returns all valid app or game items assigned to these categories
  if (normalizedType === 'app' || normalizedType === 'apps') {
    return items.filter((item) => isAppCategory(item?.category));
  }

  return items;
};