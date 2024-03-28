import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
	output: 'hybrid',
	site: 'https://www.moonmeister.net',
	integrations: [tailwind()],
	adapter: netlify({
		builders: true,
	}),
});
