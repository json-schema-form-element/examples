/** @jsxImportSource react */
// TODO: Extract to a dedicated React wrapper component?
// NOTE: React 18 doesn't have any declarative way to communicate with a
// Custom Element API. It might change with React 19, bringing partial,
// or maybe full support.

import { useState, useRef, useEffect } from 'react';

import '@jsfe/core';
import type { FromSchema, JSONSchema7, Jsf } from '@jsfe/core';

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

export default function ReactJs18() {
	const [dataInReact, setDataInReact] = useState<MyData>({
		foo: 'hello',
	});

	const formRef = useRef<Jsf>();

	useEffect(() => {
		const form = formRef.current!;
		form.data = dataInReact;
		form.schema = /* Type-casted as JSONSchema7 */ mySchema;
		form.uiSchema = {
			/* Type-casted as UiSchema */
			bar: {
				'ui:widget': 'switch',
			},
		};
		form.onDataChange = (newData) => {
			console.log({ 'Data from React 18': newData });

			if (assertValidData(newData)) setDataInReact(newData);
			else console.error('Invalid data!');
		};
		form.onFormSubmit = (newData, valid) => {
			console.log({ 'Submitted from React 18!': newData, valid });

			if (assertValidData(newData)) {
				// Do stuff...
			}
		};
	}, []);

	return (
		<article id="react">
			<json-schema-form ref={formRef}></json-schema-form>

			<pre>{JSON.stringify({ data: dataInReact }, null, 2)}</pre>
		</article>
	);
}
