/** @jsxImportSource solid-js */

import { createSignal } from 'solid-js';

// -----------------------------------------------------------------------------

import '@jsfe/core';
import type { FromSchema, JSONSchema7 } from '@jsfe/core';

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

// -----------------------------------------------------------------------------

export default function Solid() {
	const [dataInSolid, setDataInSolid] = createSignal<MyData>({
		foo: 'hello',
	});

	return (
		<article id="solid">
			<json-schema-form
				prop:schema={mySchema /* Type-casted as JSONSchema7 */}
				prop:uiSchema={{
					/* Type-casted as UiSchema */
					bar: {
						'ui:widget': 'switch',
					},
				}}
				prop:data={dataInSolid()}
				prop:onDataChange={(newData: MyData) => {
					console.log({ 'Data from Solid': newData });

					setDataInSolid(newData);
				}}
				prop:onFormSubmit={(newData: MyData, valid) => {
					console.log({ 'Submitted!': newData, valid });
				}}
			></json-schema-form>

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
