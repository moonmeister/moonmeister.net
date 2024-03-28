import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async function get({ params, request, redirect }) {
	const { filename } = params;

	if (!filename) {
		return new Response(Buffer.from('File Name Required'), {
			status: 400,
		});
	}

	if (/^(?:.*sitemap.*).(xml|xsl)$/.test(filename)) {
		const resp = await fetch(import.meta.env.WORDPRESS_URL + filename, {
			headers: { ['x-forwarded-host']: 'https://moonmeister.net/' },
		});

		if (!resp.ok) {
			return new Response(Buffer.from('sitemap File Not Found'), {
				status: 404,
				headers: {
					'content-type': 'text/plain',
				},
			});
		}

		let text = await resp.text();

		text = text.replaceAll('api.moonmeister.net', new URL(request.url).host);

		return new Response(Buffer.from(text), {
			status: resp.status,
			headers: {
				'content-type': 'application/xml',
			},
		});
	}

	return new Response(Buffer.from('File Not Found'), {
		status: 404,
	});
};
