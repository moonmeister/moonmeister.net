import readingTime from 'reading-time';
import { definePlugin } from 'emdash';
import type { PluginDescriptor, PortableTextBlock } from 'emdash';

export interface ReadingTimeOptions {
	/** Collections the plugin should process. Defaults to ["posts"]. */
	collections?: string[];
	/** Field slug on the content holding the Portable Text body. Defaults to "body". */
	bodyField?: string;
	/** Words-per-minute used when estimating reading time. Defaults to 200. */
	wordsPerMinute?: number;
}

const DEFAULTS = {
	collections: ['posts'],
	bodyField: 'body',
	wordsPerMinute: 200,
} satisfies Required<ReadingTimeOptions>;

/**
 * Walk a Portable Text body and return a plain-text representation suitable
 * for word counting. Only `block` and `code` block types contribute text.
 */
function portableTextToPlainText(blocks: unknown): string {
	if (!Array.isArray(blocks)) return '';

	const parts: string[] = [];

	for (const raw of blocks) {
		const block = raw as PortableTextBlock | { _type: string; code?: unknown };

		if (
			block._type === 'block' &&
			Array.isArray((block as PortableTextBlock).children)
		) {
			for (const child of (block as PortableTextBlock).children as unknown[]) {
				if (
					(child as { _type?: string })._type === 'span' &&
					typeof (child as { text?: unknown }).text === 'string'
				) {
					parts.push((child as { text: string }).text);
				}
			}
		} else if (
			block._type === 'code' &&
			typeof (block as { code?: unknown }).code === 'string'
		) {
			parts.push((block as { code: string }).code);
		}
	}

	return parts.join(' ');
}

export function readingTimePlugin(
	options: ReadingTimeOptions = {}
): PluginDescriptor {
	return {
		id: 'reading-time',
		version: '0.1.0',
		format: 'native',
		entrypoint: '@moonmeister/plugin-reading-time',
		options: options as Record<string, unknown>,
		adminEntry: '@moonmeister/plugin-reading-time/admin',
	};
}

export function createPlugin(options: ReadingTimeOptions = {}) {
	const collections = options.collections ?? DEFAULTS.collections;
	const bodyField = options.bodyField ?? DEFAULTS.bodyField;
	const wordsPerMinute = options.wordsPerMinute ?? DEFAULTS.wordsPerMinute;

	return definePlugin({
		id: 'reading-time',
		version: '0.1.0',

		capabilities: ['content:write'],

		admin: {
			entry: '@moonmeister/plugin-reading-time/admin',
			fieldWidgets: [
				{
					name: 'readonly',
					label: 'Reading Time (read-only)',
					fieldTypes: ['integer', 'number', 'string'],
				},
			],
		},

		hooks: {
			'content:beforeSave': async (event) => {
				if (!collections.includes(event.collection)) return;

				const body = (event.content as Record<string, unknown>)[bodyField];
				const text = portableTextToPlainText(body);
				const stats = readingTime(text, { wordsPerMinute });

				event.content.word_count = stats.words;
				event.content.reading_minutes = stats.minutes;
				event.content.reading_ms = stats.time;
				event.content.reading_text = stats.text;

				return event.content;
			},
		},
	});
}

export default createPlugin;
