import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

// -----------------------------------------------------------------------------

import '@jsfe/core';
import type { FromSchema, JSONSchema7 } from '@jsfe/core';

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

// -----------------------------------------------------------------------------

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
				.onDataChange=${(newData: MyData) => {
					this._dataInLit = newData;
					console.log({ 'Data from Lit': newData });
				}}
				.onFormSubmit=${(newData: MyData, valid: boolean) => {
					console.log({ 'Submitted!': newData, valid });
				}}
			></json-schema-form>

			<pre>${JSON.stringify({ data: this._dataInLit }, null, 2)}</pre>
		`;
	}
}
