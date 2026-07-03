import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import emdash from 'emdash/astro';
import { d1, r2, sandbox, cloudflareCache } from '@emdash-cms/cloudflare';
import { asidesPlugin } from '@moonmeister/plugin-asides';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	site: 'https://www.moonmeister.net',

	integrations: [
		react(),
		emdash({
			database: d1({ binding: 'DB' }),
			storage: r2({ binding: 'MEDIA' }),
			marketplace: 'https://marketplace.emdashcms.com',
			sandboxRunner: sandbox(),
			plugins: [asidesPlugin()],
			cache: {
				provider: cloudflareCache(),
			},
		}),
		sitemap({
			changefreq: 'weekly',
			lastmod: new Date(),
		}),
	],

	adapter: cloudflare(),
	vite: {
		plugins: [tailwindcss()],
		ssr: {
			noExternal: ['@moonmeister/plugin-asides'],
		},
		optimizeDeps: {
			exclude: ['@moonmeister/plugin-asides'],
		},
	},
});
