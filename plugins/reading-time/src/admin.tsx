import type { ComponentType } from 'react';

interface FieldWidgetProps {
	value: unknown;
	onChange: (value: unknown) => void;
	label: string;
	id: string;
	required?: boolean;
	options?: Record<string, unknown>;
	minimal?: boolean;
}

/**
 * Render-only widget for reading-time fields. The value is computed by the
 * `content:beforeSave` hook, so this component intentionally ignores
 * `onChange` and simply displays whatever was stored.
 */
function ReadOnly({ value, label, id, minimal }: FieldWidgetProps) {
	const display = value === null || value === undefined || value === '' ? '—' : String(value);

	return (
		<div>
			<label
				htmlFor={id}
				style={{
					display: 'block',
					fontSize: minimal ? '0.75rem' : '0.875rem',
					fontWeight: minimal ? 400 : 500,
					marginBottom: '0.25rem',
					opacity: minimal ? 0.6 : 1,
				}}
			>
				{label}
			</label>
			<div
				id={id}
				aria-readonly="true"
				style={{
					padding: '0.5rem 0.75rem',
					borderRadius: '0.375rem',
					border: '1px solid rgba(125, 125, 125, 0.25)',
					background: 'rgba(125, 125, 125, 0.05)',
					fontSize: '0.875rem',
					fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
					color: 'inherit',
				}}
			>
				{display}
			</div>
		</div>
	);
}

export const fields: Record<string, ComponentType<FieldWidgetProps>> = {
	readonly: ReadOnly,
};
