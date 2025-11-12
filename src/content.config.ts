import { z, defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';

const posts = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/posts/' }),
	schema: z.object({
		title: z.string(),
		date: z.date(),
		tags: z.array(reference('tags')).optional(),
	}),
});

const tags = defineCollection({
	loader: file('./src/content/tags.json'),
	schema: z.object({
		id: z.string(),
		name: z.string(),
	}),
});

export const collections = {
	posts,
	tags,
};
