/** @jsxImportSource solid-js */
// NOTE: Best TypeScript Custom Element support so far.
// (minor JSX namespace augmentation, but you only do it once for all CE).

import { createSignal } from 'solid-js';

import '@jsfe/shoelace';
import type { FromSchema, JSONSchema7 } from '@jsfe/shoelace';

// -----------------------------------------------------------------------------

const mySchema = {
	type: 'object',
	properties: {
		foo: {
			type: 'string',
		},
		bar: {
			type: 'boolean',
		},
	},
} as const satisfies JSONSchema7;
type MyData = FromSchema<typeof mySchema>;

function assertValidData(data: unknown): data is MyData {
	// Use your AJV or other schema checker here, if you need thorough validation
	// ...
	return true;
}

export default function SolidJs() {
	const [dataInSolid, setDataInSolid] = createSignal<MyData>({
		foo: 'hello',
	});

	return (
		<article id="solid">
			<jsf-shoelace
				prop:schema={mySchema /* Type-casted as JSONSchema7 */}
				prop:uiSchema={{
					/* Type-casted as UiSchema */
					bar: {
						'ui:widget': 'switch',
					},
				}}
				prop:data={dataInSolid()}
				prop:dataChangeCallback={(newData) => {
					console.log({ 'Data from Solid': newData });

					if (assertValidData(newData)) setDataInSolid(newData);
					else console.error('Invalid data!');
				}}
				prop:onFormSubmit={(newData, valid) => {
					console.log({ 'Submitted from Solid!': newData, valid });
					if (assertValidData(newData)) {
						// Do stuff...
					}
				}}
			></jsf-shoelace>

			<pre>{JSON.stringify({ data: dataInSolid() }, null, 2)}</pre>
		</article>
	);
}

// -----------------------------------------------------------------------------

// Global TypeScript support for properties in
// all declared Custom Elements (not just JSFE)
declare module 'solid-js' {
	namespace JSX {
		type ElementProps<T> = {
			// Add both the element's prefixed properties and the attributes
			[K in keyof T]: Props<T[K]> & HTMLAttributes<T[K]>;
		};
		// Prefixes all properties with `prop:` to match Solid's property setting syntax
		type Props<T> = {
			[K in keyof T as `prop:${string & K}`]?: T[K];
		};
		interface IntrinsicElements extends ElementProps<HTMLElementTagNameMap> {}
	}
}
