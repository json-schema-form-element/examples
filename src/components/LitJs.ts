import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@jsfe/core';

@customElement('lit-js')
export default class LitJs extends LitElement {
	@state() protected _dataInLit = {};

	override render() {
		return html`
			<json-schema-form
				.schema=${{
					type: 'object',
					properties: {
						foo: {
							type: 'string',
						},
						bar: {
							type: 'boolean',
						},
					},
				} as const}
				.data=${{
					foo: 'hello',
				}}
				.onSubmit=${(data, errors) => {
					console.info(data, errors);
				}}
				.onDataChange=${(data) => {
					this._dataInLit = data;
				}}
			></json-schema-form>

			<pre>${JSON.stringify({ data: this._dataInLit }, null, 2)}</pre>
		`;
	}
}
