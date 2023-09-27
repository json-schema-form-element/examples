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
type MyData = FromSchema<typeof mySchema>;

// -----------------------------------------------------------------------------

const astro = document.getElementById('astro')!;
const form = astro.querySelector('json-schema-form')!;
const debug = astro.querySelector('pre')!;
function print(data: any) {
	debug.innerText = JSON.stringify({ data }, null, 2);
}

form.schema = mySchema;

form.uiSchema = {
	/* Type-casted as UiSchema */
	bar: {
		'ui:widget': 'switch',
	},
};

form.data = {
	foo: 'hello',
} satisfies MyData;

print(form.data);

form.onDataChange = (newData: MyData) => {
	console.log({ 'Data from TypeScript': newData });
	print(newData);
};

form.onFormSubmit = (newData: MyData, valid) => {
	console.log({ 'Submitted!': newData, valid });
};
