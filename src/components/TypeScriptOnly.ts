import '@jsfe/core';
import type { FromSchema, JSONSchema7 } from '@jsfe/core';

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

class TypeScriptOnly extends HTMLElement {
	#form = this.querySelector('json-schema-form')!;

	#debug = this.querySelector('pre')!;

	protected _print(data: unknown) {
		this.#debug.innerText = JSON.stringify({ data }, null, 2);
	}

	connectedCallback() {
		this.#form.schema = mySchema;

		this.#form.uiSchema = {
			/* Type-casted as UiSchema */
			bar: {
				'ui:widget': 'switch',
			},
		};

		this.#form.data = {
			foo: 'hello',
		} satisfies MyData;

		this._print(this.#form.data);

		this.#form.onDataChange = (newData) => {
			console.log({ 'Data from TypeScript': newData });

			if (assertValidData(newData)) this._print(newData);
			else console.error('Invalid data!');
		};
		this.#form.onFormSubmit = (newData, valid) => {
			console.log({ 'Submitted from TypeScript!': newData, valid });

			if (assertValidData(newData)) {
				// Do stuff...
			}
		};
	}
}

customElements.define('type-script-only', TypeScriptOnly);
