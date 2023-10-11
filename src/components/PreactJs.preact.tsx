/** @jsxImportSource preact */
// NOTE: Declarative properties are not well supported, so we have to use ref.

import { useState, useRef, useEffect } from 'preact/hooks';

import '@jsfe/shoelace';
import type { FromSchema, JSONSchema7, Jsf } from '@jsfe/shoelace';

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

export default function PreactJs() {
	const [dataInPreact, setDataInPreact] = useState<MyData>({
		foo: 'hello',
	});

	const formRef = useRef<Jsf>();

	useEffect(() => {
		const form = formRef.current!;
		form.data = dataInPreact;
		form.schema = /* Type-casted as JSONSchema7 */ mySchema;
		form.uiSchema = {
			/* Type-casted as UiSchema */
			bar: {
				'ui:widget': 'switch',
			},
		};
		form.dataChangeCallback = (newData) => {
			console.log({ 'Data from Preact': newData });

			if (assertValidData(newData)) setDataInPreact(newData);
			else console.error('Invalid data!');
		};
		form.onFormSubmit = (newData, valid) => {
			console.log({ 'Submitted from Preact!': newData, valid });

			if (assertValidData(newData)) {
				// Do stuff...
			}
		};
	}, []);

	return (
		<article id="preact">
			{/* NOTE: does not exist on type 'JSX.IntrinsicElements' error.
					Need to augment JSX namespace. React does not do this */}
			<jsf-shoelace ref={formRef}></jsf-shoelace>

			<pre>{JSON.stringify({ data: dataInPreact }, null, 2)}</pre>
		</article>
	);
}
