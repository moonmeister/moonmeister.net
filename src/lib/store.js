import { readable } from 'svelte/store';

function getLocale() {
  if (typeof window !== `undefined`) {
    return window?.navigator?.language;
  }

  return 'en-US';
}

export const locale = readable(getLocale());
