import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

import emdash from 'emdash/astro';
import { d1, r2, sandbox, cloudflareCache } from '@emdash-cms/cloudflare';
import { cloudflareEmail } from '@emdash-cms/cloudflare/plugins';
import { asidesPlugin } from '@moonmeister/plugin-asides';
import atProtoPlugin from '@emdash-cms/plugin-atproto';

const {
	EMDASH_EMAIL_FROM_NAME: emailFromName,
	EMDASH_EMAIL_FROM: emailFrom,
	EMDASH_EMAIL_REPLY_TO: emailReplyTo,
} = loadEnv(process.env.NODE_ENV, process.cwd(), '');
const emdashPlugins = [asidesPlugin()];

if (emailFrom) {
	console.info('Enabling EmDash email sending via cloudflareEmail()');
	emdashPlugins.push(
		cloudflareEmail({
			from: {
				email: emailFrom,
				...(emailFromName ? { name: emailFromName } : {}),
			},
			...(emailReplyTo ? { replyTo: emailReplyTo } : {}),
			binding: 'EMAIL',
		})
	);
} else {
	console.warn(
		'EmDash email sending disabled. Set EMDASH_EMAIL_FROM in .env to enable.'
	);
}

// https://astro.build/config
export default defineConfig({
	output: 'server',
	site: 'https://www.moonmeister.net',

	integrations: [
		react(),
		emdash({
			siteUrl: 'https://www.moonmeister.net',
			database: d1({ binding: 'DB' }),
			storage: r2({ binding: 'MEDIA' }),
			sandboxRunner: sandbox(),
			plugins: emdashPlugins,
			sandboxed: [atProtoPlugin],
			cache: {
				provider: cloudflareCache(),
			},
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
