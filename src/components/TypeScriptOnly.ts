// import '../../../core/lib/index.js';
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
type myData = FromSchema<typeof mySchema>;

// -----------------------------------------------------------------------------

const astro = document.getElementById('astro')!;
const form = astro.querySelector('json-schema-form')!;
const debug = astro.querySelector('pre')!;

form.schema = mySchema;

form.uiSchema = {
	/* Type-casted as UiSchema */
	bar: {
		'ui:widget': 'switch',
	},
};

form.data = {
	foo: 'hello',
} satisfies myData;

form.onDataChange = (newData: myData) => {
	console.log({ 'Data from Astro': newData });
	debug.innerText = JSON.stringify({ data: newData }, null, 2);
};

form.onFormSubmit = (newData: myData, valid) => {
	console.log({ 'Submitted!': newData, valid });
};
