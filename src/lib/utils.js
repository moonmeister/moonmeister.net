/* eslint-disable import/prefer-default-export */

export function formatDateString(dateString, locale) {
  const date = new Date(dateString);

  return date.toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });
}

const rainbowColors = [
  'hsl(282.1, 100%, 41.4%)',
  'hsl(274.6, 100%, 25.5%)',
  'hsl(240, 100%, 50%)',
  'hsl(120, 100%, 50%)',
  'hsl(60, 100%, 50%)',
  'hsl(29.9, 100%, 50%)',
  'hsl(0, 100%, 50%)',
];

export function rainbowColor(position, totalCount) {
  if (totalCount < 7) {
    return rainbowColors[position];
  }
}
