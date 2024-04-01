import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify/functions';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  site: 'https://www.moonmeister.net',
  integrations: [tailwind(), sitemap({
		changefreq: 'weekly',
		priority: 0.7,
		lastmod: new Date(),
	})],
  adapter: netlify({
    builders: true
  })
});
