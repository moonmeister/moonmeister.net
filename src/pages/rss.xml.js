import rss from '@astrojs/rss';
import { getEmDashCollection } from 'emdash';

export async function GET(context) {
	const { entries: posts, cacheHint } = await getEmDashCollection('posts', {
		status: 'published',
	});

	context.cache.set(cacheHint);

	return rss({
		// `<title>` field in output xml
		title: 'Alex Moon Blog',
		// `<description>` field in output xml
		description: 'Figuring out tech, slowly...',
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#contextsite
		site: context.site,
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.publishedAt,
			link: `${context.site}blog/${post.slug}/`,
		})),
		// (optional) inject custom xml
		customData: `<language>en-us</language>`,
	});
}
