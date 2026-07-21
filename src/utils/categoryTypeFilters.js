const APP_CATEGORY_NAMES = [
  'Top Apps',
  'Popular Apps',
  'Desktop',
  'Finance',
  'Entertainment',
  'Communication',
  'Tools',
  'Shopping',
  'Food',
  'Audio',
  'Personalization',
  'Lifestyle',
  'Travel',
  'Maps',
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
  'Vehicles',
  'Photography',
  'Dating',
  'Comics',
  'Beauty',
  'Parenting',
];

const GAME_CATEGORY_NAMES = [
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
export const isGameCategory = (category = '') => matchesCategorySet(category, GAME_CATEGORY_NAMES);

export const filterAppsByType = (items = [], type = '') => {
  const normalizedType = String(type || '').trim().toLowerCase();

  if (normalizedType === 'game' || normalizedType === 'games') {
    return items.filter((item) => isGameCategory(item?.category));
  }

  if (normalizedType === 'app' || normalizedType === 'apps') {
    return items.filter((item) => isAppCategory(item?.category));
  }

  return items;
};
