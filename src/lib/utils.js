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

  return '#fff';
}

export function getUrlQuery(name, query) {
  const results = query.match(new RegExp(`[?|&]${name}=([^&?]*)`));

  return Array.isArray(results) && results[1];
}

export function getRandomInt(max, incrament = 1) {
  const rand = Math.floor(Math.random() * Math.floor(max));
  if (incrament > 1) return Math.ceil(rand / incrament) * incrament;

  return rand;
}

function append(acc, arg) {
  return acc + arg + ' ';
}

export function classNames(...args) {
  let classes = '';

  for (const arg of args) {
    if (!arg) continue;
    const argType = typeof arg;
    if (argType === 'string' || argType === 'number') {
      classes = append(classes, arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classNames(...arg);
      if (inner) classes = append(classes, inner);
    } else if (argType === 'object') {
      for (const [key, value] of Object.entries(arg)) {
        if (value) classes = append(classes, key);
      }
    }
  }

  return classes;
}
