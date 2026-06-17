import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import emdash from 'emdash/astro';
import { d1, r2 } from '@emdash-cms/cloudflare';
import { readingTimePlugin } from '@moonmeister/plugin-reading-time';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	site: 'https://www.moonmeister.net',

	integrations: [
		react(),
		emdash({
			database: d1({ binding: 'DB' }),
			storage: r2({ binding: 'MEDIA' }),
			plugins: [readingTimePlugin({ collections: ['posts'] })],
		}),
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
		}),
	],

	adapter: cloudflare(),

	vite: {
		plugins: [tailwindcss()],
		ssr: {
			noExternal: ['@moonmeister/plugin-reading-time'],
		},
		optimizeDeps: {
			exclude: ['@moonmeister/plugin-reading-time'],
		},
	},
});
