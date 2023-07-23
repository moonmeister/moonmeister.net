import type { APIRoute } from 'astro';

export const get: APIRoute = async function get({ params, request, redirect }) {
	const { type } = params;

	const url = new URL(request.url)

	const resp = await fetch(import.meta.env.WORDPRESS_URL + url.pathname, {
		headers: { ["x-forwarded-host"]: 'https://moonmeister.net/' },
	});

	if (!resp.ok) {
		return new Response(Buffer.from('RSS File Not Found'), {
			status: 404,
			headers: {
				'content-type': 'text/plain',
			}
		})
	};

	let text = await resp.text();

	text = text.replaceAll('api.moonmeister.net', url.host);

	return new Response(Buffer.from(text), {
		status: 200,
		headers: {
			'content-type': resp.headers.get('content-type') || 'application/rss+xml',
			'content-disposition': `inline; filename="${type ? `feed.${type}` : 'rss.xml'}"`,

		}
	});
};
