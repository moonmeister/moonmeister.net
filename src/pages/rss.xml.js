import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
	const posts = await getCollection('posts');

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
			pubDate: post.data.date,
			link: `${context.site}blog/${post.id}/`,
		})),
		// (optional) inject custom xml
		customData: `<language>en-us</language>`,
	});
}
