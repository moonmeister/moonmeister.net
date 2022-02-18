import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
  kit: {
    trailingSlash: 'always',
    adapter: adapter(),
    vite: {
      server: {
        fs: {
          // Allow serving files from one level up to the project root
          allow: ['..'],
        },
      },
    },
  },
};

export default config;
