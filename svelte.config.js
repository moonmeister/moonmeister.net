import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

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

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      server: {
        fs: {
          // Allow serving files from one level up to the project root
          allow: ['..'],
        },
      },
      resolve: {
        alias: {
          $houdini: path.resolve('.', '$houdini'),
        },
      },
    },
  },
};

export default config;
