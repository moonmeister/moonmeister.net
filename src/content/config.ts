import { z, defineCollection, reference } from "astro:content";

const postsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		date: z.date(),
		tags: z.array(reference("tags")).optional(),
	}),
});

const tagsCollection = defineCollection({
	type: "data",
	schema: z.object({
		name: z.string(),
	}),
});

export const collections = {
  posts: postsCollection,
	tags: tagsCollection,
};
