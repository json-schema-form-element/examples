/** @jsxImportSource solid-js */

import { createSignal } from 'solid-js';

import '@jsfe/core';

export default function Solid() {
	const [dataInSolid, setDataInSolid] = createSignal({});

	return (
		<article id="solid">
			<json-schema-form
				prop:schema={{
					/* Type-casted as JSONSchema7 */
					type: 'object',
					properties: {
						foo: {
							type: 'string',
						},
						bar: {
							type: 'boolean',
						},
					},
				}}
				prop:data={{
					foo: 'hello',
				}}
				prop:onDataChange={(data) => {
					console.log(data);

					setDataInSolid(data);
				}}
				prop:onSubmit={(data) => {
					console.log(data);
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
