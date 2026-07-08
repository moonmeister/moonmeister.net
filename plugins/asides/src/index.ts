import { definePlugin } from 'emdash';
import type { PluginDescriptor } from 'emdash';

export type AsideVariant = 'note' | 'tip' | 'caution' | 'danger';

const VARIANTS: { value: AsideVariant; label: string }[] = [
	{ value: 'note', label: 'Note' },
	{ value: 'tip', label: 'Tip' },
	{ value: 'caution', label: 'Caution' },
	{ value: 'danger', label: 'Danger' },
];

export function asidesPlugin(): PluginDescriptor {
	return {
		id: 'asides',
		version: '0.1.0',
		format: 'native',
		entrypoint: '@moonmeister/plugin-asides',
		componentsEntry: '@moonmeister/plugin-asides/astro',
	};
}

export function createPlugin() {
	return definePlugin({
		id: 'asides',
		version: '0.1.0',

		admin: {
			portableTextBlocks: [
				{
					type: 'aside',
					label: 'Aside',
					description: 'Highlighted callout (note / tip / caution / danger)',
					category: 'Layout',
					placeholder: 'Aside body (markdown supported)…',
					fields: [
						{
							type: 'select',
							action_id: 'variant',
							label: 'Variant',
							options: VARIANTS.map(({ value, label }) => ({ value, label })),
							initial_value: 'note',
						},
						{
							type: 'text_input',
							action_id: 'title',
							label: 'Title (optional)',
							placeholder: 'Leave blank to use the variant name',
						},
						{
							type: 'text_input',
							action_id: 'body',
							label: 'Body (markdown)',
							multiline: true,
							placeholder: '**Tip:** write markdown here.',
						},
					],
				},
			],
		},
	});
}

export default createPlugin;
