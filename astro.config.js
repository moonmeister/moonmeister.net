import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import remarkDirective from 'remark-directive';
import astroStarlightRemarkAsides from 'astro-starlight-remark-asides';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: 'https://www.moonmeister.net',

	integrations: [
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
		}),
	],

	markdown: {
		remarkPlugins: [remarkDirective, astroStarlightRemarkAsides],
	},

	adapter: netlify(),

	vite: {
		plugins: [tailwindcss()],
	},
});
