import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@jsfe/core';
import type { FromSchema, JSONSchema7 } from '@jsfe/core';

// -----------------------------------------------------------------------------

export const mySchema = {
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
export type MyData = FromSchema<typeof mySchema>;

function assertValidData(data: unknown): data is MyData {
	// Use your AJV or other schema checker here, if you need thorough validation
	return true;
}

@customElement('lit-js')
export default class LitJs extends LitElement {
	@state() private _dataInLit: MyData = {
		foo: 'hello',
	};

	override render() {
		return html`
			<json-schema-form
				.schema=${mySchema /* Type-casted as JSONSchema7 */}
				.uiSchema=${{
					/* Type-casted as UiSchema */
					bar: {
						'ui:widget': 'switch',
					},
				}}
				.data=${this._dataInLit}
				.onDataChange=${(newData: unknown) => {
					console.log({ 'Data from Lit': newData });

					if (assertValidData(newData)) this._dataInLit = newData;
					else console.error('Invalid data!');
				}}
				.onFormSubmit=${(newData: unknown, valid: boolean) => {
					console.log({ 'Submitted from Lit!': newData, valid });

					if (assertValidData(newData)) {
						// Do stuff...
					}
				}}
			></json-schema-form>

			<pre>${JSON.stringify({ data: this._dataInLit }, null, 2)}</pre>
		`;
	}
}
